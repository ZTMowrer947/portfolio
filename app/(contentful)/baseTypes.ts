import 'server-only';

// API types
export interface CtResource<T extends string> {
  sys: {
    type: T;
  };
}

export interface CtIdentifiableResource<T extends string>
  extends CtResource<T> {
  sys: CtResource<T>['sys'] & {
    id: string;
  };
}

export interface CtLink<LinkT extends string>
  extends CtIdentifiableResource<'Link'> {
  sys: CtIdentifiableResource<'Link'>['sys'] & {
    linkType: LinkT;
  };
}

export type CtItem<
  Type extends string,
  Fields
> = CtIdentifiableResource<Type> & {
  fields: Fields;
};

export type CtEntry<ContentType extends string, Fields> = CtItem<
  'Entry',
  Fields
> & {
  metadata: {
    tags: CtLink<'Tag'>[];
  };
  sys: CtItem<'Entry', Fields> & {
    contentType: CtLink<'ContentType'> & {
      sys: {
        id: ContentType;
      };
    };
  };
};

export interface CtCollection<
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
export type CtAssetLink = CtLink<'Asset'>;

export type CtAsset<Details = undefined> = CtItem<
  'Asset',
  {
    file: {
      url: string;
      contentType: string;
      details: Details;
    };
  }
>;

export type CtImage = CtAsset<{
  image: {
    width: number;
    height: number;
  };
}>;

export interface CtImageIncludes {
  Asset: CtImage[];
}
