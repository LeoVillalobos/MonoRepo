import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/infrastructure/database/models/security/user.model';
import { JwtPayload } from 'src/modules/auth/strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user's credentials by checking the provided email and password.
   *
   * @param email - The email address of the user to validate.
   * @param password - The plaintext password to verify against the stored hash.
   * @returns A promise that resolves to the authenticated {@link User} object if validation succeeds.
   * @throws {UnauthorizedException} If the user is not found or the credentials are incorrect.
   */
  async validateUser(email: string, password: string): Promise<User> {
    console.log("email", email)
    console.log("password", password)
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    return user;
  }

  /**
   * Authenticates a user and generates JWT access and refresh tokens.
   *
   * @param user - The user entity to authenticate.
   * @returns An object containing the generated access and refresh tokens.
   *
   * @remarks
   * - The access token is signed with `JWT_SECRET` and expires in 15 minutes.
   * - The refresh token is signed with `JWT_REFRESH_SECRET` and expires in 7 days.
   * - The refresh token is hashed and stored for future validation.
   */
  async login(user: User) {
    const payload: JwtPayload = { sub: user.id, name: user.username, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // Guardar refresh token hasheado
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.usersService.setRefreshToken(user.id, hashedRefresh);

    return {
      accessToken,
      refreshToken,
    };
  }


  /**
   * Refreshes the access and refresh tokens for a user.
   *
   * This method verifies the provided refresh token, checks its validity against the stored hash,
   * and performs token rotation by generating new access and refresh tokens. The new refresh token
   * is hashed and stored for future validation.
   *
   * @param refreshToken - The JWT refresh token provided by the client.
   * @returns An object containing the new access token and refresh token.
   * @throws {UnauthorizedException} If the refresh token is invalid, expired, or does not match the stored hash.
   */
  async refreshTokens(refreshToken: string) {
    try {
      // Verificar JWT
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Buscar usuario
      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Usuario inválido');
      }

      // Comparar token enviado con el hash guardado
      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) throw new UnauthorizedException('Refresh token no válido');

      // Rotación de tokens
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, name: user.username, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '2m' },
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      );

      // Guardar nuevo refresh token hasheado
      const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);
      await this.usersService.setRefreshToken(user.id, hashedRefresh);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  /**
   * Logs out the user by invalidating their refresh token.
   *
   * @param userId - The unique identifier of the user to log out.
   * @returns An object containing a message indicating successful logout.
   */

  async logout(userId: string) {
    await this.usersService.setRefreshToken(userId, null);
    return { message: 'Sesión cerrada correctamente' };
  }

}
