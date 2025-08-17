import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { TreeNode as TreeNodeType } from '../../types';
import TreeNodeComponent from './TreeNode';

interface VirtualizedTreeProps {
  nodes: TreeNodeType[];
  onToggle: (nodeId: string) => void;
  onSelect: (node: TreeNodeType) => void;
  selectedNodeId: string | null;
  height?: number;
  itemHeight?: number;
}

interface FlattenedNode {
  node: TreeNodeType;
  level: number;
  isVisible: boolean;
}

export const VirtualizedTree: React.FC<VirtualizedTreeProps> = ({
  nodes,
  onToggle,
  onSelect,
  selectedNodeId,
  height = 400,
  itemHeight = 48,
}) => {
  const flattenedNodes = useMemo(() => {
    const result: FlattenedNode[] = [];

    const flatten = (nodeList: TreeNodeType[], level: number) => {
      nodeList.forEach((node) => {
        if (node.isVisible !== false) {
          result.push({
            node,
            level,
            isVisible: true,
          });

          if (node.isExpanded && node.children.length > 0) {
            flatten(node.children, level + 1);
          }
        }
      });
    };

    flatten(nodes, 0);
    return result;
  }, [nodes]);

  const handleToggle = useCallback(
    (nodeId: string) => {
      onToggle(nodeId);
    },
    [onToggle]
  );

  const handleSelect = useCallback(
    (node: TreeNodeType) => {
      onSelect(node);
    },
    [onSelect]
  );

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const { node, level } = flattenedNodes[index];

      return (
        <div style={style}>
          <TreeNodeComponent
            node={node}
            level={level}
            onToggle={handleToggle}
            onSelect={handleSelect}
            selectedNodeId={selectedNodeId}
          />
        </div>
      );
    },
    [flattenedNodes, handleToggle, handleSelect, selectedNodeId]
  );

  if (flattenedNodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        Nenhum item encontrado
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={flattenedNodes.length}
      itemSize={itemHeight}
      width="100%"
      overscanCount={5}
    >
      {renderRow}
    </List>
  );
};
