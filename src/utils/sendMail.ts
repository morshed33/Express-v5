import nodemailer, { Transporter } from "nodemailer";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVICE, SMTP_USER } from "../constants/env";
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const { to, subject, html } = options;
  const transporter: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMTP_USER,
    to,
    subject,
    html
  };
  await transporter.sendMail(mailOptions);

};

export default sendMail;
 
