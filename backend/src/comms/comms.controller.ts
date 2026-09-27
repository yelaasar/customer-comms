import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';
import { YourNextDeliveryResponse } from './comms.types';

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getYourNextDelivery(
    @Param('userId') userId: string,
  ): YourNextDeliveryResponse {
    return this.commsService.getYourNextDelivery(userId);
  }
}
