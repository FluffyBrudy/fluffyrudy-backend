import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
import ms from 'ms';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);
    console.log(user);
    return user;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUser(@Req() request: Request) {
    const user = request.user as { id: number; email: string };
    const userInfo = this.authService.getAuthorizedUserInfo(user);
    return userInfo;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    const validatedUser = await this.authService.validateUser(loginUserDto);
    const { id, email, accessToken, refreshToken } = this.authService.login(
      validatedUser,
      true,
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7d'),
    });
    response.json({ id, email, accessToken });
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request: Request) {
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
    return { accessToken, email, id };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return { message: 'logout success' };
  }
}
