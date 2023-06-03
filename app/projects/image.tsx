import { ProjectImage } from '@/app/projects/type';
import { forwardRef } from 'react';

interface ProjectImgProps {
  image: ProjectImage;
}

const mediaConditions = {
  xlarge: 'min-width: 1280px',
  large: 'min-width: 1024px',
  medium: 'min-width: 768px',
};

const ProjectImg = forwardRef<HTMLImageElement, ProjectImgProps>(
  function ProjectImg({ image }, ref) {
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

export default ProjectImg;
