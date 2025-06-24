import React, { memo, useRef, useEffect } from 'react';
import type { ImageProps } from '@/types/image';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
  images: ImageProps[];
  lastViewedPhoto: string | null;
  onSetLastViewedPhoto: (photoId: string | null) => void;
}

export const ImageGrid = memo<ImageGridProps>(({ 
  images, 
  lastViewedPhoto,
  onSetLastViewedPhoto 
}) => {
  const lastViewedPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && lastViewedPhotoRef.current) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' });
      onSetLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, onSetLastViewedPhoto]);

  return (
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      {images.map((image, index) => {
        const isLastViewed = image.id === Number(lastViewedPhoto);
        
        return (
          <div
            key={image.id}
            ref={isLastViewed ? lastViewedPhotoRef : null}
          >
            <ImageCard
              image={image}
              priority={index < 4}
              isLastViewed={isLastViewed}
            />
          </div>
        );
      })}
    </div>
  );
});

ImageGrid.displayName = 'ImageGrid';