import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CommsModule } from './comms.module';

describe('CommsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /comms/your-next-delivery/:userId returns the delivery comms', () => {
    return request(app.getHttpServer())
      .get('/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5')
      .expect(200)
      .expect({
        title: 'Your next delivery for Dorian and Ocie',
        message:
          "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
        totalPrice: 134,
        freeGift: true,
      });
  });

  it('GET /comms/your-next-delivery/:userId returns 404 for an unknown user', () => {
    return request(app.getHttpServer())
      .get('/comms/your-next-delivery/unknown')
      .expect(404);
  });
});
