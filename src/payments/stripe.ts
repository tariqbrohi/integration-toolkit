import Stripe from 'stripe';

export interface StripeConfig {
  apiKey: string;
  apiVersion?: string;
}

export class StripeService {
  private stripe: Stripe;

  constructor(config: StripeConfig) {
    this.stripe = new Stripe(config.apiKey, {
      apiVersion: (config.apiVersion as any) || '2023-10-16',
    });
  }

  async createCheckoutSession(params: Stripe.Checkout.SessionCreateParams) {
    try {
      return await this.stripe.checkout.sessions.create(params);
    } catch (error) {
      throw new Error(`Stripe Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  constructEvent(payload: string | Buffer, signature: string, secret: string) {
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async getOrCreateCustomer(email: string, metadata?: Record<string, string>) {
    const customers = await this.stripe.customers.list({ email, limit: 1 });
    if (customers.data.length > 0) return customers.data[0];
    return await this.stripe.customers.create({ email, metadata });
  }
}
