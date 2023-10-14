import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from 'src/configuration';

import { BinModule } from 'src/bin/bin.module';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { Admin, AdminSchema } from './admin.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: configuration().jwtConfig.secret,
        signOptions: { expiresIn: configuration().jwtConfig.timeout },
      }),
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    BinModule,
    MqttModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
