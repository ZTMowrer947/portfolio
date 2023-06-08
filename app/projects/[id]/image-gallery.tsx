'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { ImageData } from '@/app/projects/type';

interface ProjectImageGalleryProps {
  images: ImageData[];
  presentMs?: number;
}

export default function ProjectImageGallery({
  images,
  presentMs,
}: ProjectImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  /* istanbul ignore next */
  const timeoutDelay = presentMs ?? 5000;

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIdx((prevActive) =>
        prevActive === images.length - 1 ? 0 : prevActive + 1
      );
    }, timeoutDelay);

    /* istanbul ignore next */
    return () => {
      window.clearInterval(timerId);
    };
  }, [images.length, timeoutDelay]);

  const imgSizes = `(min-width: 1280px) 75vw,
  (min-width: 768px) 67vw,
  100vw`;

  const imageList = images.map((image, index) => {
    const priority = index === 0;
    const hiddenClassName = index === activeIdx ? 'opacity-100' : 'opacity-0';

    return (
      <Image
        src={image.src}
        fill
        priority={priority}
        key={image.id}
        alt={image.altText}
        sizes={imgSizes}
        className={`${hiddenClassName} transition-opacity duration-500`}
      />
    );
  });

  return (
    <section className="col-span-4 md:col-span-2 xl:col-span-3 md:me-2 relative aspect-video">
      {imageList}
    </section>
  );
}
