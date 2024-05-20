import { drizzle } from 'drizzle-orm/postgres-js';
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schemas';
import postgres from 'postgres';

export const client = postgres(DATABASE_URL);
export const database = drizzle(client, { schema });
