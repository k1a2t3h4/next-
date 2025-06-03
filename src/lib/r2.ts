import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const {
  CLOUDFLARE_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
} = process.env;

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID!,
    secretAccessKey: R2_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUploadUrl(bucket: string, key: string) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: 3600 });
}

export async function getPresignedDownloadUrl(bucket: string, key: string) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: 3600 });
}
