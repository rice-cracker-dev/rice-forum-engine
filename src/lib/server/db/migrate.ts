import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

const pg = postgres(process.env.DATABASE_URL!);
const db = drizzle(pg);

await migrate(db, { migrationsFolder: './drizzle' });
await pg.end();
