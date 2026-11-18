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

const transporter = nodemailer.createTransport({
  service: EMAIL_SMTP_SERVICE,
  host: EMAIL_SMTP_HOST,
  port: EMAIL_SMTP_PORT,
  secure: EMAIL_SMTP_SECURE,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
  requireTLS: true,
});

const sendMail = async ({ ...mailParams }: ISendMail) => {
  const result = await transporter.sendMail({
    ...sendMail,
  });
  return result;
};

const renderMailHTML = async (template: string, data: any) => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
  );
  return content;
};
