import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure the email transport for Outlook
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Outlook SMTP server
  port: 587,
  secure: false, // TLS requires secure=false
  auth: {
    user: process.env.EMAIL_USER, // Your Outlook email
    pass: process.env.EMAIL_PASS, // Your Outlook password or app password
  },
  tls: {
    ciphers: "SSLv3",
  },
});


export const sendVerificationEmail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <b>${code}</b>. It will expire in 10 minutes.</p>`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
