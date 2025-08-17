import type { TreeNode, Asset } from '../../types';

export const convertTreeNodeToAsset = (node: TreeNode): Asset => {
  return {
    id: node.id,
    name: node.name,
    parentId: node.parentId,
    locationId: node.locationId,
    sensorId: node.sensorType ? `SENSOR_${node.id.slice(-6)}` : undefined,
    sensorType: node.sensorType,
    status: node.status,
    gatewayId: node.sensorType ? `GATEWAY_${node.id.slice(-6)}` : undefined,
  };
};

export const isComponent = (node: TreeNode): boolean => {
  return node.type === 'component';
};

export const isAsset = (node: TreeNode): boolean => {
  return node.type === 'asset';
};

export const isLocation = (node: TreeNode): boolean => {
  return node.type === 'location';
};

export const hasChildren = (node: TreeNode): boolean => {
  return node.children.length > 0;
};

export const isExpanded = (node: TreeNode): boolean => {
  return node.isExpanded ?? false;
};
