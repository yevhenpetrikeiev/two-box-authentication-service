import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserReposetory } from '../repository/users.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategy.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const privateKey = Buffer.from(
          config.getOrThrow<string>('JWT_PRIVATE'),
          'base64',
        ).toString('utf-8');

        const publicKey = Buffer.from(
          config.getOrThrow<string>('JWT_PUBLIC'),
          'base64',
        ).toString('utf-8');

        return {
          privateKey,
          publicKey,
          signOptions: {
            expiresIn: '5m',
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserReposetory, Logger, JwtStrategy],
})
export class AuthModule {}
