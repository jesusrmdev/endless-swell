/**
 * VehicleEngine - Motor de vehículo
 */

import type { IVehicleEngine } from './interfaces';
import type { Vehicle, VehicleState } from './types';

export class VehicleEngine implements IVehicleEngine {
  private state: VehicleState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[VehicleEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): VehicleState {
    return { ...this.state };
  }

  setState(state: VehicleState): void {
    this.state = { ...state };
  }

  setVehicle(_vehicle: Vehicle): void {}

  startEngine(): void {}

  stopEngine(): void {}

  accelerate(_amount: number): void {}

  brake(): void {}

  steer(_direction: number): void {}

  consumeFuel(_amount: number): void {}

  refuel(_amount: number): void {}

  getFuelLevel(): number {
    return this.state.currentVehicle?.currentFuel ?? 0;
  }

  isMoving(): boolean {
    return this.state.isMoving;
  }

  destroy(): void {
    console.log('[VehicleEngine] Destroyed');
  }

  private createDefaultState(): VehicleState {
    return {
      currentVehicle: null,
      isMoving: false,
      speed: 0,
      position: { x: 0, y: 0 },
      rotation: 0,
    };
  }
}
