import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationStrategy } from './strategy/auth.strategy';
import {
  JWTAccessTokenProvider,
  JWTRefreshTokenProvider,
} from './provider/provider';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthenticationStrategy,
    JWTAccessTokenProvider,
    JWTRefreshTokenProvider,
  ],
})
export class AuthModule {}
