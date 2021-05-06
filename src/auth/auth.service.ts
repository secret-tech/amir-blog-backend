import { HttpService, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async getProfile(token: string, x_sign: string) {
    const response = await this.httpService
      .get(`https://account.amir.capital/account/v2/me`, {
        headers: {
          authorization: token,
          'x-sign': x_sign,
        },
      })
      .toPromise();

    const profile = response.data;
    let user = await this.usersService.findByEmail(profile.data.email);

    if (!user) {
      user = await this.usersService.create({
        status: profile.data.last_status,
        ...profile.data,
      });
    }

    return {
      user,
      access_blog_token: this.jwtService.sign({ ...user }),
    };
  }
}
