import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface S3Config {
  region: string;
  credentials: { accessKeyId: string; secretAccessKey: string; };
  endpoint?: string;
  forcePathStyle?: boolean;
}

export class S3Service {
  private s3: S3Client;

  constructor(config: S3Config) {
    this.s3 = new S3Client(config);
  }

  async uploadFile(bucket: string, key: string, body: Buffer | string, contentType?: string) {
    try {
      await this.s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
      return { success: true, key };
    } catch (error) {
      throw new Error(`S3 Error: ${error instanceof Error ? error.message : "Unknown"}`);
    }
  }

  async deleteFile(bucket: string, key: string) {
    return await this.s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  }

  async generatePresignedUrl(bucket: string, key: string, expiresIn: number = 3600) {
    return await getSignedUrl(this.s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
  }
}
