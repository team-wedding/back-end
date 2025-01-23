import nodemailer, { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const transporter : Transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST as string,
    port: parseInt(process.env.NODEMAILER_PORT as string),
    secure: false,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
    },
});