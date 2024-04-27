import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  async sendVerificationMail(email: string, token: string): Promise<void> {
    const baseUrl = 'http://localhost:3000/auth/emailVerification/';
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: 'diego',
        address: process.env.MAIL_FROM,
      },
      to: {
        name: 'diego',
        address: email,
      },
      subject: 'Email verification',
      text: `Please click no link to verify your account: ${baseUrl}${token}/${email}`,
    };

    await transport.sendMail(mailOptions);
  }
}
