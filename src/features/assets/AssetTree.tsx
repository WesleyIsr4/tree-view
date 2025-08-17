import React from 'react';
import type { TreeNode } from '../../types';
import TreeNodeComponent from './TreeNode';

interface AssetTreeProps {
  nodes: TreeNode[];
  onToggle: (nodeId: string) => void;
  onSelect: (node: TreeNode) => void;
  selectedNodeId: string | null;
}

const AssetTree: React.FC<AssetTreeProps> = ({
  nodes,
  onToggle,
  onSelect,
  selectedNodeId,
}) => {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        Nenhum item encontrado
      </div>
    );
  }

  return (
    <>
      {nodes.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          onToggle={onToggle}
          onSelect={onSelect}
          selectedNodeId={selectedNodeId}
        />
      ))}
    </>
  );
};

export default AssetTree;
