import OpenAI from 'openai';

export interface DeepSeekConfig {
  apiKey: string;
}

export class DeepSeekService {
  private deepseek: OpenAI;

  constructor(config: DeepSeekConfig) {
    this.deepseek = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: config.apiKey,
    });
  }

  async createChatCompletion(messages: any[], model: 'deepseek-chat' | 'deepseek-reasoner' = 'deepseek-chat') {
    try {
      const response = await this.deepseek.chat.completions.create({ model, messages });
      return response.choices[0].message;
    } catch (error) {
       throw new Error(`DeepSeek Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async extractInfo(prompt: string, text: string) {
    return (await this.deepseek.chat.completions.create({
      model: 'deepseek-reasoner',
      messages: [{ role: 'system', content: prompt }, { role: 'user', content: text }],
    })).choices[0].message;
  }
}
