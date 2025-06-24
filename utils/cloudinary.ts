import cloudinary from 'cloudinary';
import { CLOUDINARY_CONFIG } from './constants';

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CONFIG.CLOUD_NAME,
  api_key: CLOUDINARY_CONFIG.API_KEY,
  api_secret: CLOUDINARY_CONFIG.API_SECRET,
  secure: true,
});

export default cloudinary;