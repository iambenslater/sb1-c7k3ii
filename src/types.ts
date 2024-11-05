export interface StockEntry {
  id: string;
  plantType: string;
  size: string;
  quantity: number;
  notes?: string;
  area: string;
  staffName: string;
  timestamp: number;
}

export interface AppState {
  staffName: string;
  entries: StockEntry[];
  isOffline: boolean;
  pendingSync: StockEntry[];
}

export const PLANT_TYPES = [
  'Coastal Banksia',
  'Eucalyptus',
  'Grevillea',
  'Bottlebrush',
  'Wattle',
  'Lilly Pilly',
  'Melaleuca',
  'Native Frangipani',
] as const;

export const POT_SIZES = ['25L', '45L', '100L', '200L', '400L'] as const;

export const AREAS = ['Infill A', 'Infill B', 'Infill C', 'Main Nursery'] as const;