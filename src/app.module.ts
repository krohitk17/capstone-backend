import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MqttService } from './mqtt.service';
import { AdminModule } from './admin/admin.module';
import { BinModule } from './bin/bin.module';

import configuration from './configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().dbConfig.mongo_url),
    AdminModule,
    BinModule,
  ],
  controllers: [],
  providers: [MqttService],
})
export class AppModule {}
