import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeDto, SendCodeResponseDto } from './dto/send-code.dto';
import { VerifyDto, VerifyResponseDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendCode(
    @Body() sendCodeDto: SendCodeDto,
  ): Promise<SendCodeResponseDto> {
    return this.authService.sendCode(sendCodeDto.phoneNumber);
  }


  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto): Promise<VerifyResponseDto> {
    return this.authService.verify(verifyDto);
  }
}
