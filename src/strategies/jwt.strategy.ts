import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { stringify } from 'node:querystring';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../types/user.types.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: Buffer.from(
        config.getOrThrow<string>('JWT_PUBLIC'),
        'base64',
      ).toString('utf-8'),

      algorithms: ['RS256'],
    });
  }
  async validate(payload: UserPayload) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
