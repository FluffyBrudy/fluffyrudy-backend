import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'ACCESS_JWT',
      useFactory: () => {
        return new JwtService({
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
        });
      },
    },
    {
      provide: 'REFRESH_JWT',
      useFactory: () => {
        return new JwtService({
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          signOptions: { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
        });
      },
    },
  ],
})
export class AuthModule {}
