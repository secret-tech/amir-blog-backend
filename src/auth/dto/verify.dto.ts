import { IsJWT, IsNumberString, Length } from 'class-validator';

export class VerifyDto {
  @IsNumberString()
  @Length(4, 4)
  code: string;

  @IsJWT()
  temp_verify_token: string;
}

export class VerifyResponseDto {
  @IsJWT()
  access_token: string;
}
