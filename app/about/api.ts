import 'server-only';

import { PersonalInfo } from '@/app/about/info';
import { accessToken, apiBaseUrl } from '@/app/ctConfig';
import type { CtCollection, CtEntry, CtImageLink, CtLink } from '@/app/ctTypes';
import { CtImageIncludes } from '@/app/ctTypes';

// About page types
type CtAuthorLink = CtEntry<
  'link',
  {
    label: string;
    url: string;
  }
>;

type CtAuthor = CtEntry<
  'author',
  {
    name: string;
    bio: string;
    profileImage: CtImageLink;
    links: CtLink<'Entry'>[];
  }
>;

type CtAuthorCollection = CtCollection<
  'author',
  CtAuthor['fields'],
  CtAuthor
> & {
  includes: CtImageIncludes & {
    Entry: CtAuthorLink[];
  };
};

export async function getAuthorInfo(): Promise<PersonalInfo> {
  const res = await fetch(`${apiBaseUrl}/entries?content_type=author`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ['author'],
    },
    cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-cache',
  });

  if (!res.ok) throw new Error('uh oh');

  const data = (await res.json()) as CtAuthorCollection;

  const author = data.items[0];

  const profileImageAsset = data.includes.Asset.find(
    (asset) => asset.sys.id === author.fields.profileImage.sys.id
  )!;

  return {
    name: author.fields.name,
    bio: author.fields.bio,
    profileImageUrl: {
      id: profileImageAsset.sys.id,
      altText: `Portrait of ${author.fields.name}`,
      src: `https:${profileImageAsset.fields.file.url}`,
      height: profileImageAsset.fields.file.details.image.height,
      width: profileImageAsset.fields.file.details.image.width,
    },
    externalLinks: author.fields.links.map((entryLink) => {
      const link = data.includes.Entry.find(
        (entry) => entry.sys.id === entryLink.sys.id
      )!;

      return {
        label: link.fields.label,
        url: link.fields.url,
      };
    }),
  };
}
