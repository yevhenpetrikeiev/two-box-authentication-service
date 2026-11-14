import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserReposetory } from '../repository/users.repository.js';
import {
  comparePasswords,
  hashPassword,
} from '../shared/security/encription.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserReposetory,
    private readonly logger: Logger,
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

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      return true;
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
