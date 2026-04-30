import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


export interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
     super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  // Quitamos 'async' porque no hay await
  validate(payload: JwtPayload) {
    // Aquí puedes tipar exactamente lo que retorna tu guard
    return { userId: payload.sub, userName: payload.name, email: payload.email, role: payload.role };
  }
}
