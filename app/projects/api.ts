import 'server-only';

import type { CtProjectCollection, CtTag } from '@/app/(contentful)/entryTypes';
import {
  accessToken,
  apiBaseUrl,
  apiDraftUrl,
  previewToken,
} from '@/app/(contentful)/env';
import type { ImageData, Project } from '@/app/projects/type';

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
