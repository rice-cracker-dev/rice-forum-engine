import { redirect, type RequestEvent } from '@sveltejs/kit';

export const getRedirectPath = (event: RequestEvent) => {
  return event.url.searchParams.get('redirect') || '/';
};

export const redirectToEvent = (event: RequestEvent) => {
  if (event.url.searchParams.get('no-redirect') !== 'true') {
    redirect(302, getRedirectPath(event));
  }
};
