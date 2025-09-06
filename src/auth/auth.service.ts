import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/user/entity/user.entity';
import { CreateUserFields, UserService } from 'src/user/user.service';

export type Tpayload = { sub: User['id']; email: User['email'] };
type SafeUser = Pick<User, 'id' | 'email'>;
type LoginResult = SafeUser & { accessToken: string };
type LoginResultWithRefresh = LoginResult & { refreshToken: string };

const HASH_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('ACCESS_JWT') private readonly accessJwtService: JwtService,
    @Inject('REFRESH_JWT') private readonly refreshJwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async validateUser(
    credentials: Pick<CreateUserFields, 'email' | 'password'>,
  ): Promise<SafeUser> {
    const { email, password } = credentials;
    const user = await this.userService.findUser({ email });
    if (!user) throw new UnauthorizedException('user not found');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('invalid credentials');
    return { email: user.email, id: user.id };
  }

  async register(fields: CreateUserFields): Promise<SafeUser> {
    const user = await this.userService.findUser({ email: fields.email });
    if (user) {
      throw new ConflictException('user already exists');
    }
    const hashedPassword = await hash(fields.password, HASH_ROUNDS);
    const { id, email } = await this.userService.createUser({
      username: fields.username,
      email: fields.email,
      password: hashedPassword,
    });
    return { id, email };
  }

  login(
    user: Omit<SafeUser, 'username'>,
    includeRefreshToken: false,
  ): LoginResult;
  login(
    user: Omit<SafeUser, 'username'>,
    includeRefreshToken: true,
  ): LoginResultWithRefresh;
  login(
    user: Omit<SafeUser, 'username'>,
    includeRefreshToken?: boolean,
  ): LoginResult | LoginResultWithRefresh {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.accessJwtService.sign(payload);
    const safeUser = {
      id: user.id,
      email: user.email,
    };
    if (!includeRefreshToken) {
      return { accessToken, ...safeUser };
    } else {
      const refreshToken = this.refreshJwtService.sign(payload);
      return { accessToken, refreshToken, ...safeUser };
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      const verifiedToken = await this.refreshJwtService.verifyAsync<Tpayload>(
        token,
        {
          ignoreExpiration: false,
          ignoreNotBefore: true,
        },
      );
      return { payload: verifiedToken, error: null } as const;
    } catch (error) {
      this.logger.error((error as Error).message);
      return { error: 'invalid token', payload: null } as const;
    }
  }
}
