import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageProps } from '@/types/image';
import { buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';
import { range } from '@/utils/range';

interface ThumbnailNavigationProps {
  images: ImageProps[];
  currentIndex: number;
  onImageSelect: (id: number) => void;
}

export const ThumbnailNavigation = memo<ThumbnailNavigationProps>(({ 
  images, 
  currentIndex, 
  onImageSelect 
}) => {
  const filteredImages = images.filter((img) =>
    range(currentIndex - 15, currentIndex + 15).includes(img.id)
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
      <motion.div
        initial={false}
        className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
      >
        <AnimatePresence initial={false}>
          {filteredImages.map(({ public_id, format, id }) => (
            <motion.button
              key={id}
              initial={{
                width: '0%',
                x: `${Math.max((currentIndex - 1) * -100, 15 * -100)}%`,
              }}
              animate={{
                scale: id === currentIndex ? 1.25 : 1,
                width: '100%',
                x: `${Math.max(currentIndex * -100, 15 * -100)}%`,
              }}
              exit={{ width: '0%' }}
              onClick={() => onImageSelect(id)}
              className={`${
                id === currentIndex
                  ? 'z-20 rounded-md shadow shadow-black/50'
                  : 'z-10'
              } ${id === 0 ? 'rounded-l-md' : ''} ${
                id === images.length - 1 ? 'rounded-r-md' : ''
              } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
              aria-label={`Go to image ${id + 1}`}
            >
              <Image
                alt={`Thumbnail ${id + 1}`}
                width={180}
                height={120}
                className={`${
                  id === currentIndex
                    ? 'brightness-110 hover:brightness-110'
                    : 'brightness-50 contrast-125 hover:brightness-75'
                } h-full transform object-cover transition`}
                src={buildCloudinaryUrl(public_id, format, IMAGE_SIZES.THUMBNAIL)}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});

ThumbnailNavigation.displayName = 'ThumbnailNavigation';