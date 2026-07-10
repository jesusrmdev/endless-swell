/**
 * VehicleEngine - Tipos del motor de vehículo
 */

export type FuelType = 'gasoline' | 'diesel' | 'electric';

export type VehicleCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  fuelType: FuelType;
  maxFuel: number;
  currentFuel: number;
  maxSpeed: number;
  acceleration: number;
  handling: number;
  condition: VehicleCondition;
  mileage: number;
}

export interface VehicleState {
  currentVehicle: Vehicle | null;
  isMoving: boolean;
  speed: number;
  position: { x: number; y: number };
  rotation: number;
}
