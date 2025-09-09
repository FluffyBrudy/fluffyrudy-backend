import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../dto/register.dto';
import { LoginUserDto } from '../dto/login.dto';
import type { Request, Response } from 'express';
import { Public } from './decorator/route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);
    return user;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const validatedUser = await this.authService.validateUser(loginUserDto);
    const { id, email, accessToken, refreshToken } = this.authService.login(
      validatedUser,
      true,
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { id, email, accessToken };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refreshToken'] as string | undefined;
    if (!refreshToken) throw new BadRequestException('refresh token missing');
    const { error, payload } =
      await this.authService.verifyRefreshToken(refreshToken);
    if (error) throw new UnauthorizedException(error);
    const { accessToken, email, id } = this.authService.login(
      {
        id: payload.sub,
        email: payload.email,
      },
      false,
    );
    response.json({ accessToken, email, id });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
      httpOnly: process.env.NODE_ENV === 'production',
    });
    return { message: 'logout success' };
  }
}
