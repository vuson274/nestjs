import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../passport/local.strategy';
import { JwtStrategy } from '../../passport/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        'a2e042b7ccb8b54816b215876915e2d1db81ee3220f385f427bae7223a371d4a5b3d533f6161be6627633c138eb297e68b0f4602c39432389617b55b0f10dcbd',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
