import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service.js';
import { Pool } from 'pg';

export const PG_POOL = 'PG_POOL';

@Global()
@Module({
  providers: [
    DbService,
    {
      provide: PG_POOL,
      useFactory: () => {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
          throw new Error('DATABASE_URL is not set');
        }

        return new Pool({
          connectionString,
        });
      },
    },
  ],
  exports: [PG_POOL],
})
export class DbModule {}
