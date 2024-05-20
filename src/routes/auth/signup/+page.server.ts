import type { Actions, PageServerLoad } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import { validatePassword, validateUsername } from '$lib/validations';
import { hasher, lucia } from '$lib/server/auth';
import { database } from '$lib/server/db';
import { userTable } from '$lib/server/db/schemas/users';
import { getRedirectPath, redirectToEvent } from '$lib/server/utils';

export const load: PageServerLoad = async (event) => {
  if (event.locals.session) {
    redirect(302, getRedirectPath(event));
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    const [usernameValid, usernameMessage] = validateUsername(username);
    if (typeof username !== 'string' || !usernameValid) {
      return fail(400, {
        message: usernameMessage,
      });
    }

    const [passwordValid, passwordMessage] = validatePassword(password);
    if (typeof password !== 'string' || !passwordValid) {
      return fail(400, {
        message: passwordMessage,
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long
    const passwordHash = await hasher.hash(password);

    // TODO: check if username is already used
    await database.insert(userTable).values({
      id: userId,
      username: username,
      password_hash: passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    redirectToEvent(event);
  },
};
