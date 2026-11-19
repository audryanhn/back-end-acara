import nodemailer from "nodemailer";
import {
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PASS,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_SECURE,
  EMAIL_SMTP_SERVICE,
  EMAIL_SMTP_USER,
} from "../env";
import { ISendMail } from "../interfaces";

import ejs from "ejs";
import path from "path";

// const transporter = nodemailer.createTransport({
//   service: EMAIL_SMTP_SERVICE,
//   host: EMAIL_SMTP_HOST,
//   port: EMAIL_SMTP_PORT,
//   secure: EMAIL_SMTP_SECURE,
//   auth: {
//     user: EMAIL_SMTP_USER,
//     pass: EMAIL_SMTP_PASS,
//   },
//   requireTLS: true,
// });

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
});

export const sendMail = async ({ ...mailParams }: ISendMail) => {
  const result = await transporter.sendMail({
    ...mailParams,
  });
  return result;
};

export const renderMailHTML = async (
  template: string,
  data: any,
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data,
  );
  return content as string;
};
