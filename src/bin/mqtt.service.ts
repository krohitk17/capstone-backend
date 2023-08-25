import { Injectable, Logger } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

import configuration from '../configuration';
import { BinService } from './bin.service';

@Injectable()
export class MqttService {
  private mqttClient: MqttClient;
  capacityTopic = 'bins/capacity';
  statusTopic = 'bins/status';
  locationTopic = 'bins/location';

  constructor(private readonly binService: BinService) {
    const host = configuration().mqtt.host;
    const port = configuration().mqtt.port;

    const connectUrl = `mqtt://${host}:${port}`;

    this.mqttClient = connect(connectUrl, {
      username: configuration().mqtt.username,
      password: configuration().mqtt.password,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
      clean: true,
    });

    this.mqttClient.on('connect', () => {
      Logger.log(`Connected to ${connectUrl}`, 'MqttService');
      this.mqttClient.subscribe(this.capacityTopic, { qos: 0 });
      this.mqttClient.subscribe(this.locationTopic, { qos: 0 });
    });

    this.mqttClient.on('error', function () {
      Logger.error(`Connection failed to ${connectUrl}`, 'MqttService');
    });

    this.mqttClient.on('message', (topic, message) => {
      Logger.log(`Received ${message} from ${topic}`, 'MqttService');
      if (topic === this.capacityTopic) {
        const data = message.toString().split('/');
        const binId = data[0];
        const capacity = parseInt(data[1]);
        if (isNaN(capacity)) {
          Logger.error('Invalid capacity ' + capacity, 'MqttService');
        }
        this.binService.updateBin(binId, { capacity });
      }

      if (topic === this.locationTopic) {
        const data = message.toString().split('/');
        const binId = data[0];
        const latitude = parseFloat(data[1]);
        const longitude = parseFloat(data[2]);
        if (isNaN(longitude) || isNaN(latitude)) {
          Logger.error(
            'Invalid location ' + longitude + ' ' + latitude,
            'MqttService',
          );
        }
        const coordinates = [longitude, latitude];
        console.log(coordinates);
        this.binService.updateBin(binId, {
          loc: { type: 'Point', coordinates },
        });
      }
    });
  }

  async publishStatus(binId: string, status: 'active' | 'inactive' | 'full') {
    const topic = this.statusTopic + '/' + binId;
    this.mqttClient.publish(topic, status, {
      qos: 0,
      retain: true,
    });
  }
}
