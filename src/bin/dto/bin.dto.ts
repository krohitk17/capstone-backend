import {
  ArrayMaxSize,
  IsArray,
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
  @IsArray({
    each: true,
  })
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  @Min(-90, { each: true })
  @Max(90, { each: true })
  @Min(-180, { each: true })
  @Max(180, { each: true })
  location: [number, number];

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
