import { Inject, Injectable } from '@nestjs/common';
import { PG_POOL } from '../db/db.module.js';
import type { Pool } from 'pg';

@Injectable()
export class UserReposetory {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async createUser(email: string, password: string): Promise<void> {
    await this.pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password],
    );
  }

  async getUserByEmail(
    email: string,
  ): Promise<{ email: string; password: string; id: string } | null> {
    const result = await this.pool.query(
      'SELECT email, password, id FROM users WHERE email = $1',
      [email],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async deleteUser(email: string): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE email = $1', [email]);
  }
}
