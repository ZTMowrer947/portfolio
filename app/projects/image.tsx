import { forwardRef } from 'react';

import type { ImageData } from '@/app/projects/type';

interface ProjectImageProps {
  /**
   * The object data of the image to display.
   */
  image: ImageData;
}

const ProjectImage = forwardRef<HTMLImageElement, ProjectImageProps>(
  function ProjectImage({ image }, ref) {
    return <img ref={ref} src={image.src} alt={image.altText} />;
  }
);

export default ProjectImage;
