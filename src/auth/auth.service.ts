import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserReposetory } from '../repository/users.repository.js';
import {
  comparePasswords,
  hashPassword,
} from '../shared/security/encription.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserReposetory,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.userRepo.createUser(email, await hashPassword(password));
      this.logger.log(`User created successfully: ${email}`);
    } catch (error) {
      this.logger.error(
        `Error creating user: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      const payload = { email: user.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    } catch (error) {
      this.logger.error(
        `Error signing in user: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  async deleteUser(email: string, password: string): Promise<void> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('user not found');
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      await this.userRepo.deleteUser(email);
      this.logger.log(`User deleted successfully: ${email}`);
    } catch (error) {
      this.logger.error(
        `Error deleting user: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }
}
