/**
 * VehicleEngine - Interfaces del motor de vehículo
 */

import type { Vehicle, VehicleState } from './types';

export interface IVehicleEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): VehicleState;
  setState(state: VehicleState): void;
  setVehicle(vehicle: Vehicle): void;
  startEngine(): void;
  stopEngine(): void;
  accelerate(amount: number): void;
  brake(): void;
  steer(direction: number): void;
  consumeFuel(amount: number): void;
  refuel(amount: number): void;
  getFuelLevel(): number;
  isMoving(): boolean;
  destroy(): void;
}
