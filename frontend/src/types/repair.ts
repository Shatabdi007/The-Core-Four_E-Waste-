export interface DeviceCategory {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
}

export interface Device {
  id: string;
  name: string;
  baseRepairCost: number;
  image?: string;
}

export interface RepairIssue {
  id: string;
  name: string;
  description: string;
  costMultiplier: number;
  severity: 'low' | 'medium' | 'high';
}

export interface RepairEstimate {
  device: Device;
  issues: RepairIssue[];
  baseCost: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  estimatedTime: string;
  confidence: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface RepairCenter {
  id: string;
  name: string;
  address: Address;
  rating: number;
  distance: string;
  specializations: string[];
  isOpen: boolean;
  phone: string;
}
