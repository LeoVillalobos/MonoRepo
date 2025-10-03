import { Controller, Post, Body, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
// import { LoginRequest } from 'src/dtos/request/login-request.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { RefreshTokenRequest } from 'src/dtos/request/auth/refresh-token-request';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { LoginRequest } from 'src/dtos/request/login-request.dto';

// interface ILoginRequest {
//   email: string;
//   password: string;
// }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60 } }) // máx 5 intentos/min
  async login(@Body() body: LoginRequest) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  // @Post('login')
  // async login(@Body() body: LoginRequest, @Res({ passthrough: true }) res: Response) {
  //   console.log("body", body)
  //   const user = await this.authService.validateUser(body.email, body.password);
  //   // return this.authService.login(user);
  //   const { accessToken, refreshToken } = await this.authService.login(user);

  //   res.cookie('accessToken', accessToken, {
  //     httpOnly: true,
  //     secure: false,          // HTTPS obligatorio
  //     sameSite: 'none',      // para cross-domain
  //     maxAge: 15 * 60 * 1000,
  //   });

  //   res.cookie('refreshToken', refreshToken, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'none',      // para cross-domain
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   return { message: 'Logged in successfully' };
  // }

    // Refresh tokens
  @Post('refresh')
  @Throttle({ default: { limit: 5, ttl: 60 } }) // máx 5 intentos/min
  async refresh(@Body() body: RefreshTokenRequest) {
    return this.authService.refreshTokens(body.refreshToken);
  }
  // @Post('refresh')
  // @Throttle({ default: { limit: 5, ttl: 60 } }) // máx 5 intentos por minuto
  // async refresh(@Body() body: RefreshTokenRequest, @Res({ passthrough: true }) res: Response) {
  //   // return this.authService.refreshTokens(body.refreshToken);
  //   const { accessToken, refreshToken } = await this.authService.refreshTokens(body.refreshToken);

  //       res.cookie('accessToken', accessToken, {
  //         httpOnly: true,
  //         secure: false,
  //         sameSite: 'none',
  //         maxAge: 15 * 60 * 1000,
  //       });

  //       res.cookie('refreshToken', refreshToken, {
  //         httpOnly: true,
  //         secure: false,
  //         sameSite: 'none',
  //         maxAge: 7 * 24 * 60 * 60 * 1000,
  //       });

  //       return { message: 'Tokens renovados' };
  // }

   // Logout
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60 } }) // máx 10 refresh por minuto
  async logout(@Req() req: Request) {
    const user = req.user;
    console.log('User in logout:', user);
    if (!user) throw new UnauthorizedException('Usuario no autenticado');

    return this.authService.logout(user.userId);
  }
  // async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

  //    console.log(req.cookies); // 🔹 revisa aquí si accessToken está
  //   const user = req.user;
  //   if (!user) throw new UnauthorizedException('Usuario no autenticado');

  //   await this.authService.logout(user.userId);

  //   res.clearCookie('accessToken', { httpOnly: true, secure: false, sameSite: 'none' });
  //   res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'none' });

  //   return { message: 'Sesión cerrada correctamente' };
  // }
}
