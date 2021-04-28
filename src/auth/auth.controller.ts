import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  async getProfile(
    @Query('token') token: string,
    @Query('x_sign') x_sign: string,
  ) {
    const profile = await this.userService.getProfile(token, x_sign);
    return profile;
  }
}
