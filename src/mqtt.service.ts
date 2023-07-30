import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import configuration from 'src/configuration';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(configuration().mqtt.url, {
      port: configuration().mqtt.port,
      username: configuration().mqtt.username,
      password: configuration().mqtt.password,
    });

    this.client.on('connect', () => {
      Logger.log('Connected to MQTT broker', 'MqttController');

      this.client.subscribe('bins/#', (error) => {
        if (error) {
          Logger.error(
            `Error subscribing to MQTT topic: ${error}`,
            'MqttController',
          );
        }
      });
    });

    this.client.on('error', (error) => {
      Logger.error(
        `Error connecting to MQTT broker: ${error}`,
        'MqttController',
      );
    });

    this.client.on('close', () => {
      Logger.log('Disconnected from MQTT broker', 'MqttController');
    });

    this.client.on('message', (topic, message) => {
      Logger.log(
        `Received message on topic ${topic}: ${message.toString()}`,
        'MqttController',
      );
      const [bin_id, datatype, value] = topic.split('/');
    });
  }

  getClient(): mqtt.MqttClient {
    return this.client;
  }
}
