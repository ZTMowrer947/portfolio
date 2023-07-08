import type {
  CtCollection,
  CtEntry,
  CtResource,
} from '@/app/(contentful)/baseTypes';
import { CtProjectCollection, CtTag } from '@/app/(contentful)/entryTypes';
import {
  accessToken,
  apiBaseUrl,
  apiDraftUrl,
  previewToken,
} from '@/app/(contentful)/env';
import { ImageData, ProjectPreview } from '@/app/projects/type';

interface GetResourceOptions {
  slug: string;
  draftMode: boolean;
  tags: string[];
}

interface GetEntryOptions<Type extends string> {
  contentType: Type;
  params: URLSearchParams;
  tags: string[];
  draftMode: boolean;
}

// API helpers
function getApiParams(draftMode: boolean) {
  return {
    baseUrl: draftMode ? apiDraftUrl : apiBaseUrl,
    token: draftMode ? previewToken : accessToken,
  };
}

async function getResource<
  Type extends string,
  Resource extends CtResource<Type>,
  Out
>(
  options: GetResourceOptions,
  dataMapper: (data: Resource) => Out | Promise<Out>
): Promise<Out> {
  // Get parameters based on draft mode state
  const { baseUrl, token } = getApiParams(options.draftMode);

  // Fetch data from API
  const url = [baseUrl, options.slug].join('');
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
    next: {
      tags: options.tags,
    },
  });

  // Throw appropriate error if API returned an error
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('API Resource not found');
    }

    throw new Error('Could not fetch resource from API');
  }

  // Otherwise, map the data to the desired format
  const data = await res.json();

  return dataMapper(data);
}

async function getEntry<
  Type extends string,
  Fields,
  Item extends CtEntry<Type, Fields>,
  Collection extends CtCollection<Type, Fields, Item>,
  Out
>(
  options: GetEntryOptions<Type>,
  dataMapper: (data: Collection) => Out | Promise<Out>
): Promise<Out> {
  // Construct options for resource fetching
  options.params.set('content_type', options.contentType);
  const slug = ['/entries', options.params.toString()].join('?');

  const resOptions = {
    draftMode: options.draftMode,
    tags: options.tags,
    slug,
  };

  return getResource(resOptions, dataMapper);
}

async function getTagName(id: string, draftMode: boolean): Promise<string> {
  const options = {
    slug: `/tags/${id}`,
    draftMode,
    tags: [`tags`, `tag-${id}`],
  };

  return getResource(options, (data: CtTag) => data.name);
}

// Mappers
export async function projectMapper(collection: CtProjectCollection) {}

// Entry fetchers
export async function getProjects(): Promise<ProjectPreview[]> {
  const options = {
    tags: ['projects'],
    contentType: 'project',
    params: new URLSearchParams({
      order: 'sys.createdAt',
      select:
        'sys.id,sys.createdAt,fields.name,fields.images,fields.sourceLink,fields.liveLink',
    }),
    draftMode: false,
  };

  return getEntry(options, (collection: CtProjectCollection) => {
    return Promise.all(
      collection.items.map<Promise<ProjectPreview>>(async (ctProject) => {
        const images = ctProject.fields.images.map<ImageData>(
          (imageLink, index) => {
            const ctImage = collection.includes.Asset.find(
              (asset) => asset.sys.id === imageLink.sys.id
            )!;

            return {
              id: ctImage.sys.id,
              altText: `Project Image #${index + 1} for ${
                ctProject.fields.name
              }`,
              src: `https:${ctImage.fields.file.url}`,
              width: ctImage.fields.file.details.image.width,
              height: ctImage.fields.file.details.image.height,
            };
          }
        );

        return {
          id: ctProject.sys.id,
          title: ctProject.fields.name,
          previewImage: images[0],
          sourceLink: ctProject.fields.sourceLink ?? undefined,
          liveLink: ctProject.fields.liveLink ?? undefined,
        };
      })
    );
  });
}
