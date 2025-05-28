import { NextResponse } from 'next/server';
import { r2Client } from '@/lib/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
  try {
    const { fileName, componentCode } = await request.json();
    
    if (!fileName || !componentCode) {
      return NextResponse.json(
        { error: 'File name and component code are required' },
        { status: 400 }
      );
    }

    // Generate a unique key for the file
    const key = fileName;
    
    // Upload directly to R2 from the server
    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: componentCode,
        ContentType: 'text/plain',
      })
    );

    return NextResponse.json({
      key,
      success: true
    });
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return NextResponse.json(
      { error: 'Failed to upload component' },
      { status: 500 }
    );
  }
} 