/**
 * PhotoEngine - Interfaces del motor de fotos
 */

import type { PhotoState, Photo, PhotoFilter } from './types';

export interface IPhotoEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): PhotoState;
  setState(state: PhotoState): void;
  takePhoto(location: string, filter?: PhotoFilter): Photo | null;
  deletePhoto(photoId: string): void;
  getPhotos(location?: string): Photo[];
  getPhoto(photoId: string): Photo | null;
  applyFilter(photoId: string, filter: PhotoFilter): void;
  openGallery(): void;
  closeGallery(): void;
  isOpen(): boolean;
  getPhotoCount(): number;
  isGalleryFull(): boolean;
  destroy(): void;
}
