import nodemailer from 'nodemailer';
import { TransportOptions } from "nodemailer";

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string; };
}

export class SMTPMailer {
  private transporter: nodemailer.Transporter;

  constructor(config: SMTPConfig) {
    this.transporter = nodemailer.createTransport(config as TransportOptions);
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch { return false; }
  }

  async sendMail(from: string, to: string | string[], subject: string, html: string, text?: string) {
    try {
      return await this.transporter.sendMail({
        from, to, subject, html,
        text: text || html.replace(/<[^>]*>/g, ""),
      });
    } catch (error) {
      throw new Error(`Email Send Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  async sendMailWithAttachments(from: string, to: string, subject: string, html: string, attachments: any[]) {
    return await this.transporter.sendMail({ from, to, subject, html, attachments });
  }
}
