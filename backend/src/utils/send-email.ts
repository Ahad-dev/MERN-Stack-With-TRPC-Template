import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  const { to, subject, text, html } = options;

  console.log({ to, subject, text, html })
    if (!process.env.EMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        throw new Error("Missing environment variables for email configuration");
    }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,        // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // Your Gmail app password
    },
  });

  const mailOptions = {
    from: `HR.360 <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
