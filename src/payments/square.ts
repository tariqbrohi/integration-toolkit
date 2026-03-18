import { SquareClient, SquareEnvironment } from 'square';
import { randomUUID } from 'crypto';

export interface SquareConfig {
  accessToken: string;
  environment: 'sandbox' | 'production';
}

export class SquareService {
  private client: SquareClient;

  constructor(config: SquareConfig) {
    // Dynamic initialization to handle v40+ SDK type changes
    this.client = new (SquareClient as any)({
      accessToken: config.accessToken,
      environment: config.environment === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
    });
  }

  async createPayment(sourceId: string, amount: bigint, currency: string = 'USD') {
    try {
      const response = await (this.client.payments as any).create({
        sourceId,
        idempotencyKey: randomUUID(),
        amountMoney: {
          amount,
          currency,
        },
      });
      return response.payment;
    } catch (error) {
       throw new Error(`Square Payment Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async listOrders(locationId: string) {
    try {
      const response = await (this.client.orders as any).search({
        locationIds: [locationId],
      });
      return response.orders;
    } catch (error) {
       throw new Error(`Square Orders Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }
}
