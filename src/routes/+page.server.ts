import { transporter } from '$lib/server/smtp';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  return { navbarPageStyle: 'sticky' };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const to = formData.get('to') as string;
    const subject = formData.get('subject') as string;
    const text = formData.get('text') as string;

    await transporter.sendMail({
      from: '"Rice Forum" <noreply@rice-dev.tech>',
      to,
      subject,
      text,
    });
  },
};
