/**
 * PhotoEngine - Motor de fotos
 */

import type { IPhotoEngine } from './interfaces';
import type { PhotoState, Photo, PhotoFilter } from './types';

export class PhotoEngine implements IPhotoEngine {
  private state: PhotoState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[PhotoEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): PhotoState {
    return { ...this.state };
  }

  setState(state: PhotoState): void {
    this.state = { ...state };
  }

  takePhoto(_location: string, _filter?: PhotoFilter): Photo | null {
    return null;
  }

  deletePhoto(_photoId: string): void {}

  getPhotos(_location?: string): Photo[] {
    return [];
  }

  getPhoto(_photoId: string): Photo | null {
    return null;
  }

  applyFilter(_photoId: string, _filter: PhotoFilter): void {}

  openGallery(): void {
    this.state.isOpen = true;
  }

  closeGallery(): void {
    this.state.isOpen = false;
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  getPhotoCount(): number {
    return this.state.photos.length;
  }

  isGalleryFull(): boolean {
    return this.state.photos.length >= this.state.maxPhotos;
  }

  destroy(): void {
    console.log('[PhotoEngine] Destroyed');
  }

  private createDefaultState(): PhotoState {
    return {
      photos: [],
      currentPhoto: null,
      isOpen: false,
      maxPhotos: 100,
    };
  }
}
