import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ImageProps, SharedModalProps } from '@/types/modal';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';
import { ANIMATION_CONFIG } from '@/utils/constants';
import { NavigationButton } from './NavigationButton';
import { ActionButtons } from './ActionButtons';
import { ThumbnailNavigation } from './ThumbnailNavigation';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const SharedModal = memo<SharedModalProps>(({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction = 0,
}) => {
  const [loaded, setLoaded] = useState(false);

  const currentImage = images ? images[index] : currentPhoto!;

  const handleSwipeLeft = useCallback(() => {
    if (images && index < images.length - 1) {
      changePhotoId(index + 1);
    }
  }, [images, index, changePhotoId]);

  const handleSwipeRight = useCallback(() => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  }, [index, changePhotoId]);

  const bind = useSwipeGesture({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  });

  const handleImageLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const canNavigateLeft = index > 0;
  const canNavigateRight = images ? index < images.length - 1 : false;

  return (
    <MotionConfig
      transition={{
        x: ANIMATION_CONFIG.SPRING,
        opacity: ANIMATION_CONFIG.OPACITY,
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...bind()}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={buildCloudinaryUrl(
                    currentImage.public_id,
                    currentImage.format,
                    navigation ? IMAGE_SIZES.MEDIUM : IMAGE_SIZES.LARGE
                  )}
                  width={navigation ? IMAGE_SIZES.MEDIUM : IMAGE_SIZES.LARGE}
                  height={navigation ? 853 : 1280}
                  priority
                  alt={`Gallery image ${index + 1}`}
                  onLoad={handleImageLoad}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls overlay */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  <NavigationButton
                    direction="left"
                    onClick={() => changePhotoId(index - 1)}
                    disabled={!canNavigateLeft}
                  />
                  <NavigationButton
                    direction="right"
                    onClick={() => changePhotoId(index + 1)}
                    disabled={!canNavigateRight}
                  />
                </>
              )}
              
              <ActionButtons
                currentImage={currentImage}
                index={index}
                navigation={navigation}
                onClose={closeModal}
              />
            </div>
          )}

          {/* Thumbnail navigation */}
          {navigation && images && (
            <ThumbnailNavigation
              images={images}
              currentIndex={index}
              onImageSelect={changePhotoId}
            />
          )}
        </div>
      </div>
    </MotionConfig>
  );
});

SharedModal.displayName = 'SharedModal';