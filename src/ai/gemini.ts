import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GeminiConfig {
  apiKey: string;
  model: "gemini-1.5-pro" | "gemini-1.5-flash" | "gemini-pro";
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(config: GeminiConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: config.model });
  }

  async generateText(prompt: string) {
    try {
      const result = await this.model.generateContent(prompt);
      return (await result.response).text();
    } catch (error) {
      throw new Error(`Gemini Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async startChat(history: any[] = []) {
    return this.model.startChat({ history });
  }
}
