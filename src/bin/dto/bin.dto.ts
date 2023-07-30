import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class BinDto {
  @IsMongoId()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['inactives', 'full', 'active'])
  status: string;

  @IsNotEmpty()
  location: GeolocationCoordinates;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  capacity: number;
}

export class BinCreateDto {
  @IsOptional()
  location: GeolocationCoordinates;

  @IsOptional()
  @Min(0)
  @Max(100)
  capacity: number;
}
