import {
  Controller,
  Body,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from './admin.service';
import { BinService } from 'src/bin/bin.service';
import { ChangeStatusDto, CreateAdminDto } from './dto/request.dto';
import { AdminDto, ResponseBinDto } from './dto/response.dto';
import { AuthGuard } from './auth.guard';
import { SuperAuthGuard } from './superauth.guard';
import { MqttService } from 'src/mqtt/mqtt.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly binService: BinService,
    private readonly jwtService: JwtService,
    private readonly mqttService: MqttService,
  ) {}

  @Post('login')
  async login(@Body() body: CreateAdminDto): Promise<{ token: string }> {
    const isValid = await this.adminService.validatePassword(
      body.username,
      body.password,
    );
    if (isValid) {
      const token = await this.jwtService.signAsync({
        username: body.username,
      });
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  @UseGuards(AuthGuard)
  @UseGuards(SuperAuthGuard)
  @Post('createAdmin')
  async createAdmin(@Body() body: CreateAdminDto): Promise<AdminDto> {
    const admin = await this.adminService.createAdmin(body);
    return admin;
  }

  @UseGuards(AuthGuard)
  @Post('createbin')
  async createBin(
    @Body('isBiodegradable') isBio: boolean,
  ): Promise<ResponseBinDto> {
    const bin = await this.binService.createBin(isBio);
    return {
      _id: bin._id,
      capacity: bin.capacity,
      status: bin.status,
      loc: bin.loc.coordinates,
    };
  }

  @UseGuards(AuthGuard)
  @Patch('changeStatus')
  async changeStatus(@Body() body: ChangeStatusDto): Promise<boolean> {
    console.log('here');
    const updatedBin = await this.binService.updateBin(body.id, {
      status: body.status,
    });
    await this.mqttService.publishStatus(body.id, updatedBin.status);
    return updatedBin._id.toString() === body.id;
  }
}
