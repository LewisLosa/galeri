import cloudinary from './cloudinary';
import { generateBlurDataUrl } from './imageUtils';
import { CLOUDINARY_CONFIG } from './constants';
import type { ImageProps, CloudinarySearchResult } from '@/types/image';

let cachedResults: CloudinarySearchResult | null = null;

export const getCloudinaryResults = async (): Promise<CloudinarySearchResult> => {
  if (!cachedResults) {
    const results = await cloudinary.v2.search
      .expression(`folder:${CLOUDINARY_CONFIG.FOLDER}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute();
    
    cachedResults = results;
  }
  
  return cachedResults;
};

export const getImagesWithBlurData = async (): Promise<ImageProps[]> => {
  const results = await getCloudinaryResults();
  
  const images: ImageProps[] = results.resources.map((resource, index) => ({
    id: index,
    height: resource.height,
    width: resource.width,
    public_id: resource.public_id,
    format: resource.format,
  }));

  // Generate blur data URLs in parallel
  const blurPromises = images.map(generateBlurDataUrl);
  const blurDataUrls = await Promise.all(blurPromises);

  return images.map((image, index) => ({
    ...image,
    blurDataUrl: blurDataUrls[index],
  }));
};

export const getSingleImageWithBlur = async (photoId: number): Promise<ImageProps | null> => {
  const results = await getCloudinaryResults();
  
  if (photoId >= results.resources.length || photoId < 0) {
    return null;
  }

  const resource = results.resources[photoId];
  if (!resource) return null;

  const image: ImageProps = {
    id: photoId,
    height: resource.height,
    width: resource.width,
    public_id: resource.public_id,
    format: resource.format,
  };

  image.blurDataUrl = await generateBlurDataUrl(image);
  
  return image;
};