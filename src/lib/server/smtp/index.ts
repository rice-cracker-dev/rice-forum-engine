import nodemailer from 'nodemailer';
import { SMTP_HOSTNAME, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } from '$env/static/private';
import type Mail from 'nodemailer/lib/mailer';

export const transporter = nodemailer.createTransport({
  host: SMTP_HOSTNAME,
  port: Number(SMTP_PORT) ?? 587,
  secure: false,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export const noreplySettings: Mail.Options = {
  from: '"Rice Forum" <ricecracker2234@gmail.com>',
};
