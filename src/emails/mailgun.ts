import formData from 'form-data';
import Mailgun from 'mailgun.js';

export interface MailgunConfig {
  apiKey: string;
  domain: string;
  username?: string;
  url?: string;
}

export class MailgunService {
  private mg: any;

  constructor(config: MailgunConfig) {
    const mailgun = new Mailgun(formData);
    this.mg = mailgun.client({ username: config.username || 'api', key: config.apiKey, url: config.url });
  }

  async sendMail(from: string, to: string | string[], subject: string, html: string, domain: string) {
    try {
      return await this.mg.messages.create(domain, {
        from, to, subject, html,
        text: html.replace(/<[^>]*>/g, ""),
      });
    } catch (error) {
      throw new Error(`Mailgun Send Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  async sendMailWithTemplate(from: string, to: string, subject: string, template: string, context: Record<string, string>, domain: string) {
    return await this.mg.messages.create(domain, {
      from, to, subject, template,
      "h:X-Mailgun-Variables": JSON.stringify(context),
    });
  }
}
