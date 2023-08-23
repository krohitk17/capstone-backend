import { Controller, Get, Query } from '@nestjs/common';

import { BinService } from './bin.service';
import { ResponseBinDto } from 'src/admin/dto/response.dto';
import { NearestBinsRequestDto } from './bin.dto';

@Controller('bins')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Get()
  async findBin(@Query() params: { id: string }): Promise<ResponseBinDto> {
    const bin = await this.binService.getBin(params.id);
    return {
      _id: bin._id,
      capacity: bin.capacity,
      status: bin.status,
      loc: bin.loc.coordinates,
    };
  }

  @Get('nearestbins')
  async findNearestLocations(
    @Query() params: NearestBinsRequestDto,
  ): Promise<ResponseBinDto[]> {
    const bins = await this.binService.getNearestBins(
      params.longitude,
      params.latitude,
      params.distance,
    );
    return bins.map((bin) => ({
      _id: bin._id,
      capacity: bin.capacity,
      status: bin.status,
      loc: bin.loc.coordinates,
    }));
  }
}
