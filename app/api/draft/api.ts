import 'server-only';

import { getAuthorInfo, getProject } from '@/app/(contentful)/api';
import { PersonalInfo } from '@/app/about/info';
import { Project } from '@/app/projects/type';

interface SlugResult {
  redirectSlug: string;
  entity: Project | PersonalInfo;
}

export async function getDraftEntityBySlug(
  slug: string
): Promise<SlugResult | null> {
  const draftMode = true;
  const entityRegexes = {
    project: /^\/projects\/(?<id>\w+)$/,
    author: /^\/about$/,
  };

  // First attempt to match a project
  const projectMatchResult = entityRegexes.project.exec(slug);
  if (projectMatchResult?.groups?.id) {
    // Extract ID and fetch associated project
    const { id } = projectMatchResult.groups;
    const project = await getProject(id, draftMode);

    // If the project does not exist, the slug is invalid
    if (!project) return null;

    return {
      entity: project,
      redirectSlug: `/projects/${project.id}`,
    };
  }

  // If that fails, attempt to match the author info
  if (entityRegexes.author.test(slug)) {
    return {
      entity: await getAuthorInfo(draftMode),
      redirectSlug: '/about',
    };
  }

  // If both tests fail, the slug is invalid
  return null;
}
