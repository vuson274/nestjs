import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import e from 'express';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private jwtService: JwtService, @InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Bạn chưa đăng nhập');
    }
    const token = request.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      // console.log(payload);
      const user = await this.userRepository.findOne({ where: { access_token: token } });
      // console.log(user);
      if (!user) {
        throw new UnauthorizedException('Token is invalid or has been revoked');
      }
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
    // return super.canActivate(context) as boolean;}
  }
}
