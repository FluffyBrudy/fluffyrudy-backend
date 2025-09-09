import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Tpayload } from '../auth.service';
import { UserService } from '../../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(
  Strategy,
  'auth-strategy',
) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: Tpayload) {
    const user = await this.userService.findUser({ id: payload.sub });
    if (!user) return null;
    return { id: user.id, email: user.email };
  }
}
