import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from 'src/configuration';

import { AdminController } from './admin.controller';
import { BinModule } from 'src/bin/bin.module';
import { Admin, AdminSchema } from './admin.schema';
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
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
