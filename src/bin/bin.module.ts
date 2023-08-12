import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BinService } from './bin.service';
import { Bin, BinSchema } from './bin.schema';
import { MqttService } from 'src/bin/mqtt.service';
import { BinController } from './bin.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bin.name, schema: BinSchema }])],
  controllers: [BinController],
  providers: [BinService, MqttService],
  exports: [BinService, MqttService],
})
export class BinModule {}
