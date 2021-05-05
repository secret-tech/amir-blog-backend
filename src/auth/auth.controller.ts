import { Controller, Get, Headers, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  async getProfile(
    @Headers('authorization') token: string,
    @Headers('x-sign') x_sign: string,
    @Res() res: Response,
  ) {
    const profile = await this.authService.getProfile(token, x_sign);
    return res.json(profile);
  }
}
