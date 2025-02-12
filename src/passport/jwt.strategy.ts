import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../modules/users/users.service';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'a2e042b7ccb8b54816b215876915e2d1db81ee3220f385f427bae7223a371d4a5b3d533f6161be6627633c138eb297e68b0f4602c39432389617b55b0f10dcbd',
    });
  }
  async validate(payload: any) {
    const email = payload.email;
    const user = await this.userService.findByEmail(email);
    return user;
  }
}
