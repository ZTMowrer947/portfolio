interface ImageFragment {
  src: string;
  width: number;
}

export interface ProjectImage {
  id: string;
  altText: string;
  smallImg: ImageFragment;
  medImg: ImageFragment;
  largeImg: ImageFragment;
  xlargeImg: ImageFragment;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  sourceLink?: string;
  liveLink?: string;
  images: ProjectImage[];
}
