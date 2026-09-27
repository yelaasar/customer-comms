import { NotFoundException } from '@nestjs/common';
import { CommsService, formatCatNames } from './comms.service';
import { Cat, User } from '../users/users.types';
import { UsersRepository } from '../users/users.repository';

describe('formatCatNames', () => {
  it('formats zero, one, two and three or more names', () => {
    expect(formatCatNames([])).toBe('');
    expect(formatCatNames(['A'])).toBe('A');
    expect(formatCatNames(['A', 'B'])).toBe('A and B');
    expect(formatCatNames(['A', 'B', 'C'])).toBe('A, B and C');
    expect(formatCatNames(['A', 'B', 'C', 'D'])).toBe('A, B, C and D');
  });
});

function cat(name: string, pouchSize: Cat['pouchSize'], active = true): Cat {
  return { name, subscriptionActive: active, breed: 'Tabby', pouchSize };
}

function user(id: string, firstName: string, cats: Cat[]): User {
  return { id, firstName, lastName: 'Test', email: `${id}@example.com`, cats };
}

// The worked example from the README
const kayleigh = user('kayleigh', 'Kayleigh', [
  cat('Dorian', 'C'),
  cat('Ocie', 'F'),
  cat('Eldridge', 'A', false),
]);
const oneCat = user('one-cat', 'Sam', [cat('Milo', 'A')]);
const justUnderThreshold = user('under', 'Jo', [
  cat('Ada', 'B'),
  cat('Bo', 'B'),
]); // 119.00
const justOverThreshold = user('over', 'Al', [cat('Cy', 'A'), cat('Di', 'D')]); // 121.50
const allInactive = user('inactive', 'Pat', [cat('Zed', 'F', false)]);

describe('CommsService', () => {
  const service = new CommsService(
    new UsersRepository([
      kayleigh,
      oneCat,
      justUnderThreshold,
      justOverThreshold,
      allInactive,
    ]),
  );

  it('returns the README example, ignoring inactive cats', () => {
    expect(service.getYourNextDelivery('kayleigh')).toEqual({
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134,
      freeGift: true,
    });
  });

  it('handles a single cat', () => {
    expect(service.getYourNextDelivery('one-cat')).toEqual({
      title: 'Your next delivery for Milo',
      message:
        "Hey Sam! In two days' time, we'll be charging you for your next order for Milo's fresh food.",
      totalPrice: 55.5,
      freeGift: false,
    });
  });

  it('only gives a free gift when the total is strictly over £120', () => {
    expect(service.getYourNextDelivery('under')).toMatchObject({
      totalPrice: 119,
      freeGift: false,
    });
    expect(service.getYourNextDelivery('over')).toMatchObject({
      totalPrice: 121.5,
      freeGift: true,
    });
  });

  it('throws NotFoundException when no cats are active', () => {
    expect(() => service.getYourNextDelivery('inactive')).toThrow(
      NotFoundException,
    );
  });

  it('throws NotFoundException for an unknown user', () => {
    expect(() => service.getYourNextDelivery('unknown')).toThrow(
      NotFoundException,
    );
  });
});
