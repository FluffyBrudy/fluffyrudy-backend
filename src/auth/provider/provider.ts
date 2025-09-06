import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const JWTAccessTokenProvider: Provider = {
  provide: 'ACCESS_JWT',
  useFactory: () => {
    return new JwtService({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
    });
  },
};

export const JWTRefreshTokenProvider: Provider = {
  provide: 'REFRESH_JWT',
  useFactory: () => {
    return new JwtService({
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
    });
  },
};
