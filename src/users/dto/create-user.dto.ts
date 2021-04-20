import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName?: string;

  @IsString()
  readonly lastName?: string;

  @IsString()
  readonly patronymic?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @IsNumber()
  readonly state?: number;

  @IsBoolean()
  readonly isVerified?: boolean;
}
