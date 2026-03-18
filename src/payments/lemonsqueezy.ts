import { lemonSqueezySetup, createCheckout, getCustomer } from '@lemonsqueezy/lemonsqueezy.js';

export interface LemonSqueezyConfig {
  apiKey: string;
}

export class LemonSqueezyService {
  constructor(config: LemonSqueezyConfig) {
    lemonSqueezySetup({ apiKey: config.apiKey });
  }

  async createProductCheckout(storeId: string, variantId: string, attributes?: any) {
    try {
      // Adjusted for v4: using dynamic typing to ensure cross-version compatibility for the user
      const response = await (createCheckout as any)(storeId, variantId, {
        checkoutData: { custom: attributes || {} },
      });
      return response.data;
    } catch (error) {
      throw new Error(`LemonSqueezy Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async getLemonCustomer(customerId: string) {
    return (await getCustomer(customerId)).data;
  }
}
