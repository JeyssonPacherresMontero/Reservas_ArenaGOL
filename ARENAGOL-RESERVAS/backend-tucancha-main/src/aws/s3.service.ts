import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';
import axios from 'axios';

@Injectable()
export class S3Service implements OnModuleInit {
  private s3Client?: S3Client;
  private bucket: string;
  private endpoint: string;
  private supabaseUrl: string;
  private supabaseKey: string;
  private useSupabase = false;
  private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
    this.supabaseKey = process.env.SUPABASE_KEY || '';
    this.bucket = process.env.SUPABASE_BUCKET || process.env.DO_SPACES_BUCKET || 'tucancha';
    this.endpoint = process.env.DO_SPACES_ENDPOINT || 'https://sfo3.digitaloceanspaces.com';

    // Si tenemos credenciales de Supabase y no hay DO_SPACES_KEY explícito, usamos Supabase Storage
    if (this.supabaseUrl && this.supabaseKey && (!process.env.DO_SPACES_KEY || process.env.STORAGE_PROVIDER === 'supabase')) {
      this.useSupabase = true;
      this.logger.log(`⚡ S3Service initialized with Supabase Storage: ${this.supabaseUrl}, bucket: ${this.bucket}`);
    } else {
      this.s3Client = new S3Client({
        endpoint: this.endpoint,
        region: process.env.DO_SPACES_REGION || 'sfo3',
        credentials: {
          accessKeyId: process.env.DO_SPACES_KEY || '',
          secretAccessKey: process.env.DO_SPACES_SECRET || '',
        },
        forcePathStyle: false,
      });
      this.logger.log(`⚡ S3Service initialized for DO Spaces endpoint: ${this.endpoint}, bucket: ${this.bucket}`);
    }
  }

  async onModuleInit() {
    if (this.useSupabase) {
      this.logger.log(`✅ Using Supabase Storage for bucket: ${this.bucket}`);
      return;
    }

    if (process.env.DO_SPACES_KEY && this.s3Client) {
      try {
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'PublicReadGetObject',
              Effect: 'Allow',
              Principal: '*',
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucket}/*`],
            },
          ],
        };
        await this.s3Client.send(
          new PutBucketPolicyCommand({
            Bucket: this.bucket,
            Policy: JSON.stringify(policy),
          })
        );
        this.logger.log(`✅ DO Spaces Bucket Policy set to PUBLIC for bucket: ${this.bucket}`);
      } catch (err: any) {
        this.logger.warn(`⚠️ Could not auto-set bucket policy (might already be set or missing permissions): ${err.message}`);
      }
    }
  }

  private async uploadToSupabase(buffer: Buffer, mimetype: string, key: string): Promise<string> {
    await axios.post(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${key}`,
      buffer,
      {
        headers: {
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
          'Content-Type': mimetype || 'application/octet-stream',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );
    this.logger.log(`✅ Uploaded file to Supabase Storage: ${key}`);
    return `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${key}`;
  }

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimetype: string,
    folderPath = 'uploads'
  ): Promise<string> {
    const cleanFolderPath = folderPath.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
    const safeName = originalName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
    const fileName = `${uuidv4()}-${safeName}`;
    const key = cleanFolderPath ? `${cleanFolderPath}/${fileName}`.replace(/\/+/g, '/') : fileName;

    if (this.useSupabase) {
      return await this.uploadToSupabase(buffer, mimetype, key);
    }

    try {
      if (!this.s3Client) throw new Error('No storage client configured');
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: mimetype,
        })
      );
      const servicesUrl = (process.env.SERVICES_URL || 'http://localhost:3001').replace(/\/+$/, '');
      return `${servicesUrl}/media/${key}`;
    } catch (err: any) {
      // Fallback a Supabase si DO Spaces falla por bucket inexistente o error de configuración
      if (this.supabaseUrl && this.supabaseKey) {
        this.logger.warn(`⚠️ DO Spaces upload failed (${err.message}). Falling back to Supabase Storage.`);
        return await this.uploadToSupabase(buffer, mimetype, key);
      }
      throw err;
    }
  }

  extractKeyFromUrl(url: string): string {
    if (!url) return '';
    const supabasePrefix = `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/`;
    if (this.supabaseUrl && url.startsWith(supabasePrefix)) {
      return url.replace(supabasePrefix, '');
    }
    if (url.includes('/media/')) {
      return url.substring(url.indexOf('/media/') + 7);
    }
    const endpointHost = this.endpoint.replace('https://', '');
    const prefix = `https://${this.bucket}.${endpointHost}/`;
    if (url.startsWith(prefix)) {
      return url.replace(prefix, '');
    }
    return '';
  }

  async deleteFile(key: string): Promise<void> {
    if (!key) return;
    const cleanKey = key.replace(/^\//, '').replace(/\/+/g, '/');

    if (this.useSupabase) {
      try {
        await axios.delete(
          `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${cleanKey}`,
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
            },
          }
        );
        this.logger.log(`🗑️ Deleted file from Supabase Storage: ${cleanKey}`);
      } catch (err: any) {
        this.logger.warn(`⚠️ Error deleting file from Supabase Storage ${cleanKey}: ${err.message}`);
      }
      return;
    }

    if (this.s3Client) {
      try {
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: cleanKey,
          })
        );
        this.logger.log(`🗑️ Deleted file from DO Spaces: ${cleanKey}`);
      } catch (err: any) {
        this.logger.warn(`⚠️ Error deleting file from DO Spaces ${cleanKey}: ${err.message}`);
      }
    }
  }

  async updateImage(
    oldImageUrl: string | null,
    newBuffer: Buffer,
    originalName: string,
    mimetype: string,
    folderPath = 'uploads'
  ): Promise<string> {
    const newImageUrl = await this.uploadFile(newBuffer, originalName, mimetype, folderPath);

    if (oldImageUrl) {
      const keyToDelete = this.extractKeyFromUrl(oldImageUrl);
      if (keyToDelete) {
        await this.deleteFile(keyToDelete);
      }
    }

    return newImageUrl;
  }

  async getSignedUrl(key: string): Promise<string> {
    const cleanKey = key.replace(/^\//, '').replace(/\/+/g, '/');
    if (this.useSupabase) {
      return `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${cleanKey}`;
    }
    if (this.s3Client) {
      try {
        const command = new GetObjectCommand({
          Bucket: this.bucket,
          Key: cleanKey,
        });
        return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
      } catch (err: any) {
        this.logger.warn(`⚠️ Error signing URL for DO Spaces for ${cleanKey}: ${err.message}`);
        const endpointHost = this.endpoint.replace('https://', '');
        return `https://${this.bucket}.${endpointHost}/${cleanKey}`;
      }
    }
    return '';
  }

  async getFileStream(key: string): Promise<Readable> {
    const cleanKey = key.replace(/^\//, '').replace(/\/+/g, '/');
    if (this.useSupabase) {
      const response = await axios.get(
        `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${cleanKey}`,
        {
          responseType: 'stream',
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
          },
        }
      );
      return response.data as Readable;
    }
    if (!this.s3Client) {
      throw new Error('No storage client configured');
    }
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: cleanKey,
    });
    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }

  async uploadFiles(images: any[], folderPath: string, prefix = 'public') {
    const urls: string[] = [];
    const cleanFolderPath = `${prefix}/${folderPath}`.replace(/\/+/g, '/');

    for (const image of images) {
      const url = await this.uploadFile(
        image.buffer,
        image.originalname,
        image.mimetype,
        cleanFolderPath
      );
      urls.push(url);
    }
    return urls;
  }
}
