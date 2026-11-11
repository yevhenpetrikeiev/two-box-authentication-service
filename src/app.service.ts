import { Injectable } from '@nestjs/common';
import { UserReposetory } from './repository/users.repository.js';
import {
  comparePasswords,
  hashPassword,
} from './shared/security/encription.js';

@Injectable()
export class AppService {
  constructor(private readonly userRepo: UserReposetory) {}
  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.userRepo.createUser(email, await hashPassword(password));
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return true;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async getUserByEmail(
    email: string,
  ): Promise<{ email: string; password: string } | null> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      return user;
    } catch (error) {
      console.log('can not get user: ', error);
      return null;
    }
  }

  async deleteUser(email: string, password: string): Promise<void> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new Error('user not found');
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      await this.userRepo.deleteUser(email);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
