import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export class CloudinaryService {
  constructor(config: CloudinaryConfig) {
    cloudinary.config(config);
  }

  async uploadImage(filePath: string, folder: string = 'uploads') {
    try {
      return await cloudinary.uploader.upload(filePath, { folder, resource_type: 'auto' });
    } catch (error) {
      throw new Error(`Cloudinary Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  getTransformedUrl(publicId: string, width: number, height: number, crop: string = 'fill') {
    return cloudinary.url(publicId, { width, height, crop, gravity: 'auto' });
  }

  async deleteImage(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}
