import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const token = request.nextUrl.searchParams.get('token');

  if (
    !tag ||
    process.env.NODE_ENV !== 'production' ||
    token !== process.env.REVALIDATE_TOKEN
  )
    notFound();

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
