import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  const id = request.nextUrl.searchParams.get('id');
  const token = request.nextUrl.searchParams.get('token');

  if (
    !token ||
    process.env.NODE_ENV !== 'production' ||
    token !== process.env.REVALIDATE_TOKEN
  )
    notFound();

  if (!type || (type === 'project' && !id))
    return NextResponse.json(
      { message: 'Revalidation not supported for published entity' },
      {
        status: 400,
      }
    );

  if (type === 'project') revalidateTag(`project-${id}`);
  else if (type === 'author') revalidateTag(type);

  return NextResponse.json({
    revalidated: ['project', 'author'].includes(type),
    now: Date.now(),
  });
}
