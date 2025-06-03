import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import * as esbuild from 'esbuild';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name')?.replace(/[^a-zA-Z0-9_-]/g, '');

    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: `${name}.ts`,
    });

    const response = await r2Client.send(command);
    const rawCode = await response.Body?.transformToString(); // or .text()

    if (!rawCode) {
      return NextResponse.json({ error: 'Component code not found' }, { status: 404 });
    }

    const compiled = await esbuild.transform(rawCode, {
      loader: 'tsx',
      format: 'cjs',
      target: 'es2020',
    });

    return NextResponse.json({ code: compiled.code });
  } catch (error) {
    console.error('Context load error:', error);
    return NextResponse.json({ error: 'Failed to load context' }, { status: 500 });
  }
}
