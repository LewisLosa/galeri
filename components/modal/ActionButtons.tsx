import React, { memo, useCallback } from 'react';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { downloadImage, buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';
import type { ImageProps } from '@/types/image';

interface ActionButtonsProps {
  currentImage: ImageProps;
  index: number;
  navigation: boolean;
  onClose: () => void;
}

export const ActionButtons = memo<ActionButtonsProps>(({ 
  currentImage, 
  index, 
  navigation, 
  onClose 
}) => {
  const handleDownload = useCallback(() => {
    const url = buildCloudinaryUrl(currentImage.public_id, currentImage.format, IMAGE_SIZES.XLARGE);
    downloadImage(url, `image-${index + 1}.jpg`);
  }, [currentImage, index]);

  const fullSizeUrl = buildCloudinaryUrl(currentImage.public_id, currentImage.format, IMAGE_SIZES.XLARGE);

  return (
    <>
      {/* Top right actions */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
        <Button
          variant="ghost"
          size="sm"
          as="a"
          href={fullSizeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open full size image"
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          aria-label="Download image"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Top left close button */}
      <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Close modal"
        >
          {navigation ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <ArrowUturnLeftIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </>
  );
});

ActionButtons.displayName = 'ActionButtons';