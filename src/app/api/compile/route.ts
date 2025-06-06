// export const dynamic = 'force-dynamic';

// import { GetObjectCommand } from '@aws-sdk/client-s3';
// import { r2Client } from '@/lib/r2';
import * as esbuild from 'esbuild';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://pub-e9fe85ee4a054365808fe57dab43e678.r2.dev/${name}.tsx`);
    const code = await response.text();

    const compiled = await esbuild.transform(code, {
      loader: 'tsx',
      format: 'cjs',
      target: 'es2020',
    });

    return NextResponse.json({ code: compiled.code });
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json(
      { error: 'Failed to compile component' },
      { status: 500 }
    );
  }
} 