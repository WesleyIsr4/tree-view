import type { Location, Asset, TreeNode } from '../../types';

export function buildTree(locations: Location[], assets: Asset[]): TreeNode[] {
  const locationMap = new Map<string, Location>();
  const assetMap = new Map<string, Asset>();
  const treeNodes = new Map<string, TreeNode>();

  locations.forEach((location) => {
    locationMap.set(location.id, location);
    treeNodes.set(location.id, {
      id: location.id,
      name: location.name,
      type: 'location',
      parentId: location.parentId,
      locationId: null,
      children: [],
      isExpanded: true,
      isVisible: true,
    });
  });

  assets.forEach((asset) => {
    assetMap.set(asset.id, asset);
    const nodeType = asset.sensorType ? 'component' : 'asset';

    treeNodes.set(asset.id, {
      id: asset.id,
      name: asset.name,
      type: nodeType,
      parentId: asset.parentId,
      locationId: asset.locationId,
      sensorType: asset.sensorType,
      status: asset.status,
      children: [],
      isExpanded: true,
      isVisible: true,
    });
  });

  const rootNodes: TreeNode[] = [];

  treeNodes.forEach((node) => {
    if (node.parentId) {
      const parent = treeNodes.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  treeNodes.forEach((node) => {
    if (node.locationId && !node.parentId) {
      const location = treeNodes.get(node.locationId);
      if (location) {
        location.children.push(node);
      }
    }
  });

  treeNodes.forEach((node) => {
    if (node.type === 'location' && !node.parentId) {
      rootNodes.push(node);
    } else if (!node.parentId && !node.locationId) {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}

export function filterTree(
  nodes: TreeNode[],
  filters: {
    searchText: string;
    energySensors: boolean;
    criticalStatus: boolean;
    itemType: string;
  }
): TreeNode[] {
  const { searchText, energySensors, criticalStatus, itemType } = filters;

  return nodes
    .map((node) => {
      const matchesSearch =
        !searchText ||
        node.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesEnergy = !energySensors || node.sensorType === 'energy';
      const matchesCritical = !criticalStatus || node.status === 'alert';
      const matchesType = !itemType || node.type === itemType;

      const shouldShow =
        matchesSearch && matchesEnergy && matchesCritical && matchesType;

      if (shouldShow) {
        const filteredChildren = filterTree(node.children, filters);

        return {
          ...node,
          children: filteredChildren,
        };
      } else {
        const filteredChildren = filterTree(node.children, filters);

        if (filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
          };
        }

        return null;
      }
    })
    .filter((node): node is TreeNode => node !== null);
}
