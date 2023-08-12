import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { ObjectId } from 'mongodb';

import { CoordinatesFormatConstraint } from './bin.validator';
import { Bin } from './bin.schema';

class LocationDto {
  @IsDefined()
  @IsString()
  @IsEnum(['Point'])
  type: string;

  @IsDefined()
  @Validate(CoordinatesFormatConstraint)
  coordinates: number[];
}

export type BinDto = Bin & { _id: ObjectId };

export class BinUpdateDto {
  @IsOptional()
  loc?: LocationDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  capacity?: number;

  @IsOptional()
  @IsString()
  @IsEnum(['inactive', 'active'])
  status?: string;
}

export class NearestBinsRequestDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(2000)
  distance: number;
}
