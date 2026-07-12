/**
 * CameraPresets - Presets de cámara predefinidos
 *
 * Cada preset define el comportamiento de la cámara
 * para diferentes contextos del juego.
 */

import type { CameraPreset } from './interfaces';

/**
 * Preset para exploración del mundo exterior
 */
export const OVERWORLD_PRESET: CameraPreset = {
  name: 'OVERWORLD',
  zoom: 1,
  deadzone: {
    width: 80,
    height: 60,
  },
  followLerp: 0.1,
  shouldFollow: true,
};

/**
 * Preset para modo surf
 * Zoom un poco más cerrado para ver las olas
 */
export const SURF_PRESET: CameraPreset = {
  name: 'SURF',
  zoom: 1.2,
  deadzone: {
    width: 100,
    height: 80,
  },
  followLerp: 0.08,
  shouldFollow: true,
};

/**
 * Preset para interiores
 * Deadzone más pequeña, más cerrado
 */
export const INTERIOR_PRESET: CameraPreset = {
  name: 'INTERIOR',
  zoom: 1,
  deadzone: {
    width: 60,
    height: 50,
  },
  followLerp: 0.1,
  shouldFollow: true,
};

/**
 * Preset para conducción de vehículo
 * Zoom más abierto, seguimiento más suave
 */
export const VEHICLE_PRESET: CameraPreset = {
  name: 'VEHICLE',
  zoom: 0.8,
  deadzone: {
    width: 120,
    height: 100,
  },
  followLerp: 0.05,
  shouldFollow: true,
};

/**
 * Preset para menús
 * Sin seguimiento, zoom fijo
 */
export const MENU_PRESET: CameraPreset = {
  name: 'MENU',
  zoom: 1,
  deadzone: {
    width: 0,
    height: 0,
  },
  followLerp: 0.1,
  shouldFollow: false,
};

/**
 * Todos los presets disponibles
 */
export const CAMERA_PRESETS = {
  OVERWORLD: OVERWORLD_PRESET,
  SURF: SURF_PRESET,
  INTERIOR: INTERIOR_PRESET,
  VEHICLE: VEHICLE_PRESET,
  MENU: MENU_PRESET,
} as const;

/**
 * Nombre de todos los presets
 */
export type CameraPresetName = keyof typeof CAMERA_PRESETS;
