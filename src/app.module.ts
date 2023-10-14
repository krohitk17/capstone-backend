import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

import configuration from './configuration';

import { BinModule } from './bin/bin.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().dbConfig.mongo_url),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: configuration().mqtt.host,
          username: configuration().mqtt.username,
          password: configuration().mqtt.password,
        },
      },
    ]),

    BinModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
