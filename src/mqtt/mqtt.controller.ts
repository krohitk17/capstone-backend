import { Controller, Inject, Logger } from '@nestjs/common';

import { BinService } from '../bin/bin.service';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class MqttController {
  constructor(
    private readonly binService: BinService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern('bins/location')
  async updateBinLocation(
    @Ctx() context: MqttContext,
    @Payload() message: string,
  ): Promise<void> {
    Logger.log(message, 'MqttService Location');
    const data = message.toString().split('/');
    const binId = data[0];
    const latitude = parseFloat(data[1]);
    const longitude = parseFloat(data[2]);
    if (
      isNaN(longitude) ||
      isNaN(latitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      Logger.error(
        'Invalid location ' + longitude + ' ' + latitude,
        'MqttService',
      );
    }
    const coordinates = [longitude, latitude];
    console.log(coordinates);
    await this.binService.updateBin(binId, {
      loc: { type: 'Point', coordinates },
    });
  }

  @MessagePattern('bins/capacity')
  async updateBinCapacity(
    @Ctx() context: MqttContext,
    @Payload() message: string,
  ): Promise<void> {
    Logger.log(message, 'MqttService Capacity');
    const data = message.toString().split('/');
    const binId = data[0];
    const capacity = parseInt(data[1]);
    if (isNaN(capacity) || capacity < 0) {
      Logger.error('Invalid capacity ' + capacity, 'MqttService');
    }
    await this.binService.updateBin(binId, { capacity });
  }
}
