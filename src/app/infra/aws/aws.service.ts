import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: file.originalname,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(uploadParams);
    await this.s3Client.send(command);

    return `https://${this.bucketName}.s3.amazonaws.com/${file.originalname}`;
  }
}
