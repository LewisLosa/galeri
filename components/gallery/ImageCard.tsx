import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ImageProps } from '@/types/image';
import { buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';

interface ImageCardProps {
  image: ImageProps;
  priority?: boolean;
  isLastViewed?: boolean;
}

export const ImageCard = memo<ImageCardProps>(({ image, priority = false, isLastViewed = false }) => {
  const { id, public_id, format, blurDataUrl } = image;

  return (
    <Link
      href={`/?photoId=${id}`}
      as={`/p/${id}`}
      shallow
      className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      data-testid={`image-card-${id}`}
    >
      <Image
        alt={`Gallery image ${id + 1}`}
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        src={buildCloudinaryUrl(public_id, format, IMAGE_SIZES.SMALL)}
        width={720}
        height={480}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
      />
    </Link>
  );
});

ImageCard.displayName = 'ImageCard';