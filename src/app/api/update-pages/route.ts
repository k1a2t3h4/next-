import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { r2Client } from '@/lib/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
  try {
    const { componentName, key } = await request.json();

    // Read the current pages.json
    const filePath = path.join(process.cwd(), 'data', 'pages.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add the new component to the root route
    if (!data['']) {
      data[''] = [];
    }
    if (!data[''].includes(componentName)) {
      data[''].push(componentName);
    }

    // Upload the updated pages.json to R2
    const pagesJsonKey = 'pages.json';
    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: pagesJsonKey,
        Body: JSON.stringify(data, null, 2),
        ContentType: 'application/json',
      })
    );

    // Also update the local file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating pages:', error);
    return NextResponse.json(
      { error: 'Failed to update pages' },
      { status: 500 }
    );
  }
} 