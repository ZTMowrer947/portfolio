'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { ImageData } from '@/app/projects/type';

interface ProjectImageGalleryProps {
  images: ImageData[];
}

export default function ProjectImageGallery({
  images,
}: ProjectImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIdx((prevActive) =>
        prevActive === images.length - 1 ? 0 : prevActive + 1
      );
    }, 3000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [images.length]);

  const imgSizes = `(min-width: 1280px) 75vw,
  (min-width: 768px) 67vw,
  100vw`;

  return images.map((image, index) => {
    const priority = index === 0;
    const className = index === activeIdx ? '' : 'hidden';

    return (
      <Image
        src={image.src}
        fill
        priority={priority}
        key={image.id}
        alt={image.altText}
        sizes={imgSizes}
        className={className}
      />
    );
  });
}
