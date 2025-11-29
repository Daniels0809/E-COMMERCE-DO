// src/lib/sendMail.ts
import { google } from "googleapis";
import nodemailer from "nodemailer";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const MAIL = process.env.MAIL!;

// Configurar OAuth2
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Función para enviar correo
export async function sendEmail({
  to,
  subject = "Correo desde mi app",
  text,
  html,
  attachments,
}: {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: { filename: string; path?: string; cid?: string; content?: any }[];
}) {
  try {
    const { token } = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: token ?? undefined,
      },
    });

    const mailOptions = {
      from: MAIL,
      to,
      subject,
      text,
      html,
      attachments,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw error;
  }
}
