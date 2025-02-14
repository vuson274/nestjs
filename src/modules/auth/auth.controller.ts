import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  register(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request: any) {
    console.log(request);
    return this.authService.login(request.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: any) {
    return req.user;
  }
}
