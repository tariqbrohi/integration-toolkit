import * as paypal from '@paypal/checkout-server-sdk';

export interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  isLive: boolean;
}

export class PayPalService {
  private client: paypal.core.PayPalHttpClient;

  constructor(config: PayPalConfig) {
    const environment = config.isLive
      ? new paypal.core.LiveEnvironment(config.clientId, config.clientSecret)
      : new paypal.core.SandboxEnvironment(config.clientId, config.clientSecret);
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async createOrder(id: string, value: string, currency: string = 'USD') {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { currency_code: currency, value },
        reference_id: id,
      }],
    });

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error) {
      throw new Error(`PayPal Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async captureOrder(orderId: string) {
    // Handle potential type identification issue in deprecated SDK
    const request = new (paypal.orders as any).OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await this.client.execute(request);
    return response.result;
  }
}
