export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  FOLDER: process.env.CLOUDINARY_FOLDER,
} as const;

export const IMAGE_SIZES = {
  THUMBNAIL: 180,
  SMALL: 720,
  MEDIUM: 1280,
  LARGE: 1920,
  XLARGE: 2560,
  BLUR: 8,
} as const;

export const ANIMATION_CONFIG = {
  SPRING: { type: 'spring', stiffness: 300, damping: 30 },
  OPACITY: { duration: 0.2 },
} as const;