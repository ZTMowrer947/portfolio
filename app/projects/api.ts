import type { ImageData, Project } from '@/app/projects/type';

// Environment variables
const spaceId = process.env.CONTENTFUL_SPACEID!;
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN!;

// API types
interface CtResource<T extends string> {
  sys: {
    type: T;
  };
}

interface CtIdentifiableResource<T extends string> extends CtResource<T> {
  sys: CtResource<T>['sys'] & {
    id: string;
  };
}

interface CtLink<LinkT extends string> extends CtIdentifiableResource<'Link'> {
  sys: CtIdentifiableResource<'Link'>['sys'] & {
    linkType: LinkT;
  };
}

type CtItem<Type extends string, Fields> = CtIdentifiableResource<Type> & {
  fields: Fields;
};

type CtEntry<ContentType extends string, Fields> = CtItem<'Entry', Fields> & {
  sys: CtItem<'Entry', Fields> & {
    contentType: CtLink<'ContentType'> & {
      id: ContentType;
    };
  };
};

interface CtCollection<
  ItemType extends string,
  ItemFields,
  Item extends CtEntry<ItemType, ItemFields>
> extends CtResource<'Array'> {
  skip: number;
  limit: number;
  total: number;
  items: Item[];
}

// Portfolio-specific types
type CtImageLink = CtLink<'Asset'>;

type CtImage = CtItem<
  'Asset',
  {
    file: {
      url: string;
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  }
>;

interface CtImageIncludes {
  Asset: CtImage[];
}

type CtProject = CtEntry<
  'project',
  {
    name: string;
    description: string;
    tags: string[];
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

// API functions
function mapCtCollectionToProjectList(ctCollection: CtProjectCollection) {
  return ctCollection.items.map<Project>((ctProject) => {
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
      tags: ctProject.fields.tags,
      images,
      sourceLink: ctProject.fields.sourceLink ?? undefined,
      liveLink: ctProject.fields.liveLink ?? undefined,
    };
  });
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `https://preview.contentful.com/spaces/${spaceId}/entries?content_type=project`,
    {
      headers: {
        Authorization: `Bearer ${previewToken}`,
      },
      next: {
        tags: ['projects'],
      },
      cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
    }
  );

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtProjectCollection;

  return mapCtCollectionToProjectList(data);
}

export async function getProject(id: string): Promise<Project> {
  const res = await fetch(
    `https://preview.contentful.com/spaces/${spaceId}/entries?content_type=project&sys.id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${previewToken}`,
      },
      next: {
        tags: [`project-${id}`],
      },
      cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
    }
  );

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtProjectCollection;

  const projectResults = mapCtCollectionToProjectList(data);

  return projectResults[0];
}
