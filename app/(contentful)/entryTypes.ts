import 'server-only';

import type {
  CtCollection,
  CtEntry,
  CtImageIncludes,
  CtImageLink,
  CtLink,
} from '@/app/(contentful)/baseTypes';
import { CtIdentifiableResource } from '@/app/(contentful)/baseTypes';

// Project types
export type CtProject = CtEntry<
  'project',
  {
    name: string;
    description: string;
    images: CtImageLink[];
    sourceLink: string | null;
    liveLink: string | null;
  }
>;

export type CtProjectCollection = CtCollection<
  'project',
  CtProject['fields'],
  CtProject
> & {
  includes: CtImageIncludes;
};

export type CtTag = CtIdentifiableResource<'Tag'> & {
  name: string;
};

// Author types
export type CtAuthorLink = CtEntry<
  'link',
  {
    label: string;
    url: string;
  }
>;

export type CtAuthor = CtEntry<
  'author',
  {
    name: string;
    bio: string;
    profileImage: CtImageLink;
    links: CtLink<'Entry'>[];
  }
>;

export type CtAuthorCollection = CtCollection<
  'author',
  CtAuthor['fields'],
  CtAuthor
> & {
  includes: CtImageIncludes & {
    Entry: CtAuthorLink[];
  };
};
