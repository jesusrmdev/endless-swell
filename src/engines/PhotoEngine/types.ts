/**
 * PhotoEngine - Tipos del motor de fotos
 */

export type PhotoFilter = 'none' | 'vintage' | 'sepia' | 'bw' | 'vivid';

export interface Photo {
  id: string;
  filename: string;
  location: string;
  timestamp: number;
  filter: PhotoFilter;
  description: string;
  tags: string[];
  width: number;
  height: number;
}

export interface PhotoState {
  photos: Photo[];
  currentPhoto: Photo | null;
  isOpen: boolean;
  maxPhotos: number;
}
