import type { ImageProps } from './image';

export interface ModalProps {
  images: ImageProps[];
  onClose?: () => void;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export interface CarouselProps {
  index: number;
  currentPhoto: ImageProps;
}