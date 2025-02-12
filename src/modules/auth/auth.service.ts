import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: any): Promise<any> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.userService.saveRefreshToken(refreshToken, user.id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }
}
