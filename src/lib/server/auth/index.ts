import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Argon2id } from 'oslo/password';
import { dev } from '$app/environment';
import { sessionTable, userTable } from '../db/schemas/users';
import { database } from '../db';

const adapter = new DrizzlePostgreSQLAdapter(database, sessionTable, userTable); // your adapter

export const hasher = new Argon2id();

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}
