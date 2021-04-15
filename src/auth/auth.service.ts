import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as SMSru from 'sms_ru';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SendCodeResponseDto } from './dto/send-code.dto';
import { VerifyDto } from './dto/verify.dto';
@Injectable()
export class AuthService {
  private smsService: any;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.smsService = new SMSru(process.env.SMS_RU_API_KEY);
  }

  async sendCode(phoneNumber: string): Promise<SendCodeResponseDto> {
    const user: User = await this.usersService.upsertByPhoneNumber(phoneNumber);

    const code = this.generateCode();

    this.smsService.sms_send(
      { to: phoneNumber, text: code },
      function (e: any) {
        console.log(e.code);
      },
    );

    return { temp_verify_token: this.jwtService.sign({ id: user.id, code }) };
  }

  async verify(data: VerifyDto) {
    try {
      const payload = await this.jwtService.verifyAsync(data.temp_verify_token);

      if (data.code !== payload.code) throw new UnauthorizedException();

      await this.usersService.update(+payload.id, { isVerified: true });

      return {
        access_token: this.jwtService.sign({ id: payload.id }),
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  private generateCode(length = 4): string {
    if (length < 1) {
      throw new RangeError('Length must be at least 1');
    }
    const possible = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return code;
  }
}
