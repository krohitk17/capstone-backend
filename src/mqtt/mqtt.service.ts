import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  async publishStatus(binId: string, status: string): Promise<void> {
    Logger.log(`Publishing ${status} for ${binId}`, 'BinService');
    this.client.emit(`bins/status/${binId}`, status);
  }
}
