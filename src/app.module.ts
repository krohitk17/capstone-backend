import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from './configuration';

import { BinModule } from './bin/bin.module';
import { AdminModule } from './admin/admin.module';
import { ModelModule } from './model/model.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().dbConfig.mongo_url),

    BinModule,
    AdminModule,
    ModelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
