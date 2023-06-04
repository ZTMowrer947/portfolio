import { forwardRef } from 'react';

import { ResponsiveImageData } from '@/app/projects/type';

interface ProjectImageProps {
  /**
   * The responsive data for the image to display.
   */
  image: ResponsiveImageData;
}

const mediaConditions = {
  xlarge: 'min-width: 1280px',
  large: 'min-width: 1024px',
  medium: 'min-width: 768px',
};

const ProjectImage = forwardRef<HTMLImageElement, ProjectImageProps>(
  function ProjectImage({ image }, ref) {
    const imgFragments = [
      image.xlargeImg,
      image.largeImg,
      image.medImg,
      image.smallImg,
    ];
    const mediaClauses = [
      mediaConditions.xlarge,
      mediaConditions.large,
      mediaConditions.medium,
    ];

    const srcSet = imgFragments
      .map((fragment) => `${fragment.src} ${fragment.width}w`)
      .join(', ');
    const largerSizes = mediaClauses
      .map((media, idx) => `(${media}) ${imgFragments[idx].width}px`)
      .join(', ');
    const finalSizes = `${largerSizes}, ${image.smallImg.width}px`;

    return (
      <img
        ref={ref}
        src={image.smallImg.src}
        srcSet={srcSet}
        sizes={finalSizes}
        alt={image.altText}
      />
    );
  }
);

export default ProjectImage;
