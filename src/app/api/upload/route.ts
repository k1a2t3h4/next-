import * as esbuild from 'esbuild';
import { NextResponse } from 'next/server';
import { r2Client } from '@/lib/r2';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const {
  R2_BUCKET_NAME_TSX,
  R2_BUCKET_NAME_JS,
} = process.env;

export async function POST(request: Request) {
  try {
    const { name, code } = await request.json();

    if (!name || !code) {
      return NextResponse.json(
        { error: 'File name and component code are required' },
        { status: 400 }
      );
    }

    const tsxFilename = `${name}.tsx`;
    const jsFilename = `${name}.js`;

    // Upload the raw TSX code to the TSX bucket
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME_TSX!,
        Key: tsxFilename,
        Body: code,
        ContentType: 'text/plain',
      })
    );

    // Transform the TSX code into a JS bundle
    const result = await esbuild.transform(code, {
      loader: 'tsx',
      target: 'es2020',
      format: 'cjs',
    });

    const jsCode = result.code;

    // Upload the transformed JS code to the JS bucket
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME_JS!,
        Key: jsFilename,
        Body: jsCode,
        ContentType: 'application/javascript',
      })
    );

    // Generate presigned URLs for both files
    const tsxPresignedUrl = await getSignedUrl(
      r2Client,
      new GetObjectCommand({
        Bucket: R2_BUCKET_NAME_TSX!,
        Key: tsxFilename,
      }),
      { expiresIn: 3600 } // URL expires in 1 hour
    );

    const jsPresignedUrl = await getSignedUrl(
      r2Client,
      new GetObjectCommand({
        Bucket: R2_BUCKET_NAME_JS!,
        Key: jsFilename,
      }),
      { expiresIn: 3600 } // URL expires in 1 hour
    );
    console.log(jsPresignedUrl)
    return NextResponse.json({
      success: true,
      tsxUploaded: tsxFilename,
      jsUploaded: jsFilename,
      tsxUrl: tsxPresignedUrl,
      jsUrl: jsPresignedUrl,
    });
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return NextResponse.json(
      { error: 'Failed to upload component' },
      { status: 500 }
    );
  }
}
