export interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface CloudinaryResource {
  height: number;
  width: number;
  public_id: string;
  format: string;
}

export interface CloudinarySearchResult {
  resources: CloudinaryResource[];
}