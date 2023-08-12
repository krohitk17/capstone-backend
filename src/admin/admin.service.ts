import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcryptjs';

import { Admin, AdminDocument } from './admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(body: any): Promise<any> {
    const admin = await this.adminModel.create(body);
    return admin;
  }

  async getAdmin(username: string): Promise<any> {
    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin) {
      throw new NotFoundException(`Admin ${username} not found`);
    }
    return admin;
  }

  async validatePassword(username: string, password: string): Promise<any> {
    const admin = await this.adminModel
      .findOne({ username })
      .select('password')
      .exec();
    if (!admin) {
      throw new NotFoundException(`Admin ${username} not found`);
    }
    return await compare(password, admin.password);
  }
}
