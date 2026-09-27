import { Injectable, NotFoundException } from '@nestjs/common';
import { PouchSize } from '../users/users.types';
import { YourNextDeliveryResponse } from './comms.types';
import { UsersRepository } from '../users/users.repository';

// Prices in pence to avoid floating point drift when summing
const POUCH_PRICES_PENCE: Record<PouchSize, number> = {
  A: 5550,
  B: 5950,
  C: 6275,
  D: 6600,
  E: 6900,
  F: 7125,
};
const FREE_GIFT_THRESHOLD_PENCE = 12000;

export function formatCatNames(names: string[]): string {
  if (names.length <= 1) {
    return names[0] ?? '';
  }
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

@Injectable()
export class CommsService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getYourNextDelivery(userId: string): YourNextDeliveryResponse {
    const user = this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);
    if (activeCats.length === 0) {
      throw new NotFoundException(`User ${userId} has no active subscriptions`);
    }

    const catNames = formatCatNames(activeCats.map((cat) => cat.name));
    const totalPence = activeCats.reduce(
      (sum, cat) => sum + POUCH_PRICES_PENCE[cat.pouchSize],
      0,
    );

    return {
      title: `Your next delivery for ${catNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
      totalPrice: totalPence / 100,
      freeGift: totalPence > FREE_GIFT_THRESHOLD_PENCE,
    };
  }
}
