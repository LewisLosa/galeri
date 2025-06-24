import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { CarouselProps } from '@/types/modal';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useLastViewedPhoto } from '@/hooks/useLastViewedPhoto';
import { buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';
import { SharedModal } from './SharedModal';

export const Carousel = memo<CarouselProps>(({ index, currentPhoto }) => {
  const router = useRouter();
  const [, setLastViewedPhoto] = useLastViewedPhoto();

  const closeModal = useCallback(() => {
    setLastViewedPhoto(String(currentPhoto.id));
    router.push('/', undefined, { shallow: true });
  }, [currentPhoto.id, router, setLastViewedPhoto]);

  const changePhotoId = useCallback((newVal: number) => {
    return newVal;
  }, []);

  useKeyPress('Escape', closeModal);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
        aria-label="Close carousel"
      >
        <Image
          src={currentPhoto.blurDataUrl || ''}
          className="pointer-events-none h-full w-full"
          alt="Blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
});

Carousel.displayName = 'Carousel';