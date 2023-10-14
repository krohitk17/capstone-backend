import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import configuration from 'src/configuration';

import { MqttController } from './mqtt.controller';
import { BinModule } from 'src/bin/bin.module';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: configuration().mqtt.host,
          port: configuration().mqtt.port,
          username: configuration().mqtt.username,
          password: configuration().mqtt.password,
        },
      },
    ]),
    BinModule,
  ],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
