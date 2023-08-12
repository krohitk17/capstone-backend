import { Body, Controller, Get, Query } from '@nestjs/common';

import { BinService } from './bin.service';
import { ResponseBinDto } from 'src/admin/dto/response.dto';
import { NearestBinsRequestDto } from './bin.dto';

@Controller('bins')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Get()
  async findBin(@Query() id: { id: string }): Promise<ResponseBinDto> {
    console.log(id);
    const bin = await this.binService.getBin(id.id);
    console.log(bin);
    return {
      _id: bin._id,
      capacity: bin.capacity,
      status: bin.status,
      loc: bin.loc.coordinates,
    };
  }

  @Get('nearestbins')
  async findNearestLocations(
    @Body() body: NearestBinsRequestDto,
  ): Promise<ResponseBinDto[]> {
    const bins = await this.binService.getNearestBins(
      body.longitude,
      body.latitude,
      body.distance,
    );
    return bins.map((bin) => ({
      _id: bin._id,
      capacity: bin.capacity,
      status: bin.status,
      loc: bin.loc.coordinates,
    }));
  }
}
