import OpenAI from 'openai';

export interface OpenAIConfig {
  apiKey: string;
  defaultModel?: string;
}

export class OpenAIService {
  private openai: OpenAI;
  private defaultModel: string;

  constructor(config: OpenAIConfig) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
    this.defaultModel = config.defaultModel || 'gpt-4o';
  }

  async createChatCompletion(messages: OpenAI.Chat.ChatCompletionMessageParam[], model?: string) {
    const selectedModel = model || this.defaultModel;
    try {
      const resp = await this.openai.chat.completions.create({ model: selectedModel, messages });
      return resp.choices[0].message;
    } catch (error) {
      throw new Error(`OpenAI Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async generateImage(prompt: string, size: OpenAI.Images.ImageGenerateParams['size'] = '1024x1024') {
    const resp = await this.openai.images.generate({ prompt, n: 1, size });
    return resp.data?.[0]?.url || '';
  }
}
