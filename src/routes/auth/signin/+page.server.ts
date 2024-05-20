import type { Actions, PageServerLoad } from './$types';
import { hasher, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { validatePassword, validateUsername } from '$lib/validations';
import { database } from '$lib/server/db';
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

    const existingUser = await database.query.userTable.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });

    if (!existingUser) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid usernames.
      // However, valid usernames can be already be revealed with the signup page among other methods.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
      // If usernames are public, you may outright tell the user that the username is invalid.
      return fail(400, {
        message: 'Incorrect username or password!!',
      });
    }

    const validPassword = await hasher.verify(existingUser.password_hash, password);
    if (!validPassword) {
      return fail(400, {
        message: 'Incorrect username or password',
      });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    redirectToEvent(event);
  },
};
