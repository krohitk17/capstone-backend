import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class ChangeStatusDto {
  @IsDefined()
  @IsMongoId()
  id: string;

  @IsDefined()
  @IsString()
  @IsEnum(['inactive', 'active'])
  status: 'inactive' | 'active';
}
