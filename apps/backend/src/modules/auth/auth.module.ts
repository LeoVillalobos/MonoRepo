// src/modules/auth.module.ts
import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
// import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';

@Global()
@Module({
  imports: [
    ConfigModule, // asegurarte de que está disponible
    PassportModule,
    UsersModule,
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // para usar en handlers o controllers
})
export class AuthModule {}
