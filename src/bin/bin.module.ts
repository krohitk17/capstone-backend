import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BinController } from './bin.controller';
import { BinService } from './bin.service';
import { BinSchema } from './bin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bin', schema: BinSchema }])],
  controllers: [BinController],
  providers: [BinService],
})
export class BinModule {}
