import { IsJWT, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendCodeDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class SendCodeResponseDto {
  @IsJWT()
  @IsNotEmpty()
  temp_verify_token: string;
}
