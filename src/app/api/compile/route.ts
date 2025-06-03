export const dynamic = 'force-dynamic';

import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import * as esbuild from 'esbuild';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
    }

    // Get raw code from R2
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME_TSX!,
      Key: `${name}.tsx`,
    });

    const response = await r2Client.send(command);
    const rawCode = await response.Body?.transformToString();

    if (!rawCode) {
      return NextResponse.json({ error: 'Component code not found' }, { status: 404 });
    }

    // Compile the code
    const compiled = await esbuild.transform(rawCode, {
      loader: 'tsx',
      format: 'cjs',
      target: 'es2020',
    });

    return NextResponse.json({ code: compiled.code });
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json({ error: 'Failed to compile component' }, { status: 500 });
  }
} 