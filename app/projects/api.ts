import 'server-only';

import {
  accessToken,
  apiBaseUrl,
  apiDraftUrl,
  previewToken,
} from '@/app/ctConfig';
import type {
  CtCollection,
  CtEntry,
  CtIdentifiableResource,
  CtImageIncludes,
  CtImageLink,
} from '@/app/ctTypes';
import type { ImageData, Project } from '@/app/projects/type';

type CtProject = CtEntry<
  'project',
  {
    name: string;
    description: string;
    images: CtImageLink[];
    sourceLink: string | null;
    liveLink: string | null;
  }
>;

type CtProjectCollection = CtCollection<
  'project',
  CtProject['fields'],
  CtProject
> & {
  includes: CtImageIncludes;
};

type CtTag = CtIdentifiableResource<'Tag'> & {
  name: string;
};

// API functions
function getApiParams(draftMode: boolean) {
  return {
    baseUrl: draftMode ? apiDraftUrl : apiBaseUrl,
    token: draftMode ? previewToken : accessToken,
  };
}

async function getTagName(id: string, draftMode: boolean): Promise<string> {
  const { baseUrl, token } = getApiParams(draftMode);

  const res = await fetch(`${baseUrl}/tags/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [`tag-${id}`],
    },
    cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
  });

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtTag;

  return data.name;
}

async function mapCtCollectionToProjectList(
  ctCollection: CtProjectCollection,
  draftMode: boolean
) {
  return Promise.all(
    ctCollection.items.map<Promise<Project>>(async (ctProject) => {
      const images = ctProject.fields.images.map<ImageData>((imageLink) => {
        const ctImage = ctCollection.includes.Asset.find(
          (asset) => asset.sys.id === imageLink.sys.id
        )!;

        return {
          id: ctImage.sys.id,
          altText: 'idk just yet about that one chief', // TODO: Extract viable alt text for project images
          src: `https:${ctImage.fields.file.url}`,
          width: ctImage.fields.file.details.image.width,
          height: ctImage.fields.file.details.image.height,
        };
      });

      return {
        id: ctProject.sys.id,
        title: ctProject.fields.name,
        description: ctProject.fields.description,
        tags: await Promise.all(
          ctProject.metadata.tags.map((tag) =>
            getTagName(tag.sys.id, draftMode)
          )
        ),
        images,
        sourceLink: ctProject.fields.sourceLink ?? undefined,
        liveLink: ctProject.fields.liveLink ?? undefined,
      };
    })
  );
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${apiBaseUrl}/entries?content_type=project&order=sys.createdAt`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['projects'],
      },
      cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
    }
  );

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtProjectCollection;

  return await mapCtCollectionToProjectList(data, false);
}

export async function getProject(
  id: string,
  draftMode = false
): Promise<Project> {
  const { baseUrl, token } = getApiParams(draftMode);

  const res = await fetch(
    `${baseUrl}/entries?content_type=project&sys.id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`project-${id}`],
      },
      cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
    }
  );

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtProjectCollection;

  const projectResults = await mapCtCollectionToProjectList(data, draftMode);

  return projectResults[0];
}
