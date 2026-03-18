import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseStorageConfig {
  url: string;
  bucket: string;
  serviceKey: string;
}

export class SupabaseStorageService {
  private client: SupabaseClient;
  private bucket: string;

  constructor(config: SupabaseStorageConfig) {
    this.client = createClient(config.url, config.serviceKey);
    this.bucket = config.bucket;
  }

  async uploadFile(path: string, file: Buffer | File, contentType?: string) {
    try {
      const { data, error } = await this.client.storage
        .from(this.bucket)
        .upload(path, file, { upsert: true, contentType });
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
       throw new Error(`Supabase Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  getPublicUrl(path: string) {
    return this.client.storage.from(this.bucket).getPublicUrl(path).data.publicUrl;
  }

  async deleteFile(path: string) {
    return await this.client.storage.from(this.bucket).remove([path]);
  }
}
