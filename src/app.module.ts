import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module.js';
import { UserReposetory } from './repository/users.repository.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, AuthModule],
  controllers: [],
  providers: [UserReposetory],
})
export class AppModule {}
