import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bin, BinDocument } from './bin.schema';
import { BinDto, BinUpdateDto } from './bin.dto';

@Injectable()
export class BinService {
  constructor(
    @InjectModel(Bin.name) private readonly binModel: Model<BinDocument>,
  ) {}

  async createBin(): Promise<BinDto> {
    const bin = new this.binModel();
    await bin.save();
    return bin;
  }

  async getBin(id: string): Promise<BinDto> {
    const bin = await this.binModel.findById(id).exec();
    if (!bin) {
      Logger.error(`Bin ${id} not found`, 'BinService');
      return;
    }
    return bin;
  }

  async getNearestBins(
    longitude: number,
    latitude: number,
    distance: number,
  ): Promise<BinDto[]> {
    return await this.binModel
      .find({
        loc: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: distance,
          },
        },
      })
      .exec();
  }

  async updateBin(id: string, updateData: BinUpdateDto): Promise<BinDto> {
    const bin = await this.getBin(id);
    if (!bin) {
      return;
    }
    if (bin.status === 'inactive') {
      if (!updateData.status) {
        Logger.error('Bin is inactive', 'BinService');
        return;
      }
    }
    if (updateData.status === 'active') {
      updateData.status = bin.capacity === 100 ? 'full' : 'active';
    }
    if (updateData.capacity) {
      updateData.status = updateData.capacity === 100 ? 'full' : 'active';
    }

    return await this.binModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async removeBin(id: string): Promise<BinDto> {
    return await this.binModel.findByIdAndDelete(id);
  }
}
