import { Resend } from 'resend';

export interface ResendConfig {
  apiKey: string;
}

export class ResendService {
  private resend: Resend;

  constructor(config: ResendConfig) {
    this.resend = new Resend(config.apiKey);
  }

  async sendEmail(from: string, to: string | string[], subject: string, html: string, text?: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from, to, subject, html,
        text: text || "HTML-less version",
      });
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(`Resend Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  async getEmailDetails(id: string) {
    const { data, error } = await this.resend.emails.get(id);
    if (error) throw new Error(error.message);
    return data;
  }
}
