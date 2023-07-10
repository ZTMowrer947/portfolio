import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { getDraftEntityBySlug } from '@/app/api/draft/api';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check the secret and next parameters
  if (secret !== process.env.DRAFT_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  // Attempt to fetch an entity from the slug
  const result = await getDraftEntityBySlug(slug);

  // If this fails, don't enable draft mode
  if (!result) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Otherwise, enable draft mode by setting the cookie
  draftMode().enable();

  // Redirect to the correct path to preview the entity in draft mode
  redirect(result.redirectSlug);
}
