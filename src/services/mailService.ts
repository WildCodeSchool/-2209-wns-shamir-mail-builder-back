import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class MailService {
  static async sendEmail(
    email: string,
    subject: string,
    message: string
  ): Promise<{
    error: boolean;
    message: string;
  }> {
    let success: boolean = false;

    const transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_USERNAME}" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: email,
      subject: subject,
      html: message,
    };

    await new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error: Error | null, info) => {
        if (!error) {
          console.log("Email sent: " + info.response);
          success = true;
          resolve(true);
        } else {
          console.warn(error);
          reject(false);
        }
      });
    });

    if (success) {
      return {
        error: false,
        message: "Email sent successfully",
      };
    } else {
      return {
        error: true,
        message: "Email failed to send",
      };
    }
  }
}
