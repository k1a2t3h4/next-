import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';

export async function GET() {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME_TSX!,
      Key: 'filter.json',
    });

    const response = await r2Client.send(command);
    const filterData = await response.Body?.transformToString();

    if (!filterData) {
      return NextResponse.json({ 
        category: '',
        searchTerm: '',
        categories: []
      });
    }

    return NextResponse.json(JSON.parse(filterData));
  } catch (error) {
    console.error('Error fetching filter data:', error);
    return NextResponse.json({ 
      category: '',
      searchTerm: '',
      categories: []
    });
  }
} 