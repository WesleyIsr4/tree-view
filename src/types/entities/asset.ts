export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  sensorId?: string;
  sensorType?: 'vibration' | 'energy';
  status?: 'operating' | 'alert';
  gatewayId?: string;
}

export interface TreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  parentId: string | null;
  locationId: string | null;
  sensorType?: 'vibration' | 'energy';
  status?: 'operating' | 'alert';
  children: TreeNode[];
  isExpanded?: boolean;
  isVisible?: boolean;
}
