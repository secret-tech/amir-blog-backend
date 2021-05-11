import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  async getProfile(@Req() req: any, @Res() res: Response) {
    const profile = await this.authService.getProfile(req.amirToken, req.xSign);
    return res.json(profile);
  }
}
