import React, { memo, useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { ModalProps } from '@/types/modal';
import { useKeyPress } from '@/hooks/useKeyPress';
import { SharedModal } from './SharedModal';

export const Modal = memo<ModalProps>(({ images, onClose }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  const handleClose = useCallback(() => {
    router.push('/', undefined, { shallow: true });
    onClose?.();
  }, [router, onClose]);

  const changePhotoId = useCallback((newVal: number) => {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(
      {
        query: { photoId: newVal },
      },
      `/p/${newVal}`,
      { shallow: true }
    );
  }, [index, router]);

  const handleArrowRight = useCallback(() => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  }, [index, images.length, changePhotoId]);

  const handleArrowLeft = useCallback(() => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  }, [index, changePhotoId]);

  useKeyPress('ArrowRight', handleArrowRight);
  useKeyPress('ArrowLeft', handleArrowLeft);
  useKeyPress('Escape', handleClose);

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  );
});

Modal.displayName = 'Modal';