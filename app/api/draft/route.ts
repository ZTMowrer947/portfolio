// route handler with secret and slug
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { getProject } from '@/app/(contentful)/api';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check the secret and next parameters
  if (secret !== process.env.DRAFT_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  // Try to extract a project ID from the slug
  const projectSlugRegex = /^\/projects\/(?<id>\w+)$/;

  const matchResult = projectSlugRegex.exec(slug);

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!matchResult?.groups?.id) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Fetch the project data
  const project = await getProject(matchResult.groups.id, true);

  if (!project) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(`/projects/${project.id}`);
}
