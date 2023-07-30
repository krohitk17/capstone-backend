import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BinData, BinDocument } from './bin.schema';
import { BinDto } from './dto/bin.dto';

@Injectable()
export class BinService {
  constructor(
    @InjectModel(BinData.name) private readonly binModel: Model<BinDocument>,
  ) {}

  async createBin(): Promise<BinDto> {
    const bin = new this.binModel();
    try {
      await bin.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return bin;
  }

  async getBin(id: string): Promise<BinDto> {
    try {
      return await this.binModel.findById(id).exec();
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async updateBin(id: string, bin: BinData): Promise<BinDto> {
    try {
      return await this.binModel.findByIdAndUpdate(id, bin, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async removeBin(id: string): Promise<BinDto> {
    try {
      return await this.binModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }
}
