import { CLOUDINARY_CONFIG, IMAGE_SIZES } from './constants';
import type { ImageProps } from '@/types/image';

export const buildCloudinaryUrl = (
  publicId: string,
  format: string,
  width: number,
  quality = 'auto'
): string => {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload/c_scale,w_${width},q_${quality}/${publicId}.${format}`;
};

export const getImageSrcSet = (publicId: string, format: string): string => {
  return [
    `${buildCloudinaryUrl(publicId, format, IMAGE_SIZES.SMALL)} 720w`,
    `${buildCloudinaryUrl(publicId, format, IMAGE_SIZES.MEDIUM)} 1280w`,
    `${buildCloudinaryUrl(publicId, format, IMAGE_SIZES.LARGE)} 1920w`,
  ].join(', ');
};

export const downloadImage = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    });
    
    if (!response.ok) throw new Error('Download failed');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = filename || url.split('/').pop() || 'image.jpg';
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

export const generateBlurDataUrl = async (image: ImageProps): Promise<string> => {
  const cache = new Map<string, string>();
  const cacheKey = `${image.public_id}.${image.format}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const response = await fetch(
      buildCloudinaryUrl(image.public_id, image.format, IMAGE_SIZES.BLUR, '70')
    );
    
    if (!response.ok) throw new Error('Failed to generate blur placeholder');
    
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    
    cache.set(cacheKey, dataUrl);
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate blur placeholder:', error);
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }
};