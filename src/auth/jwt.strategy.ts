import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  validate(payload: any) {
    return { id: payload.user.id };
  }
}
