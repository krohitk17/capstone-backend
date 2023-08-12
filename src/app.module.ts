import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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

    BinModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
