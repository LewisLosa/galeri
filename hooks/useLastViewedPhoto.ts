import { useState, useCallback } from 'react';

export const useLastViewedPhoto = () => {
  const [lastViewedPhoto, setLastViewedPhotoState] = useState<string | null>(null);

  const setLastViewedPhoto = useCallback((photoId: string | null) => {
    setLastViewedPhotoState(photoId);
  }, []);

  return [lastViewedPhoto, setLastViewedPhoto] as const;
};