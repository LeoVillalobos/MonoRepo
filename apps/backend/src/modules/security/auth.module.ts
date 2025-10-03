// src/modules/auth.module.ts
import { Global, Module } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
// import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';

@Global()
@Module({
  imports: [
    ConfigModule, // asegurarte de que está disponible
    PassportModule,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60,   // cada 60 segundos
    //     limit: 20, // por defecto: 20 requests/IP en ese minuto
    //   },
    // ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [AuthService], // para usar en handlers o controllers
})
export class AuthModule {}
