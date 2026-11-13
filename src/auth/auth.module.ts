import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserReposetory } from '../repository/users.repository.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserReposetory],
})
export class AuthModule {}
