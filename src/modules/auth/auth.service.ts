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
    console.log(user);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    });
    const accessToken = this.jwtService.sign(payload);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.userService.saveToken(refreshToken, accessToken, user.id);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
