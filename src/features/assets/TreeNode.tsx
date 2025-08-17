import React from 'react';
import { ChevronDown, ChevronRight, Zap } from 'lucide-react';
import type { TreeNode } from '../../types';

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  onToggle: (nodeId: string) => void;
  onSelect: (node: TreeNode) => void;
  selectedNodeId: string | null;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  onToggle,
  onSelect,
  selectedNodeId,
}) => {
  const hasChildren = node.children.length > 0;
  const isExpanded = node.isExpanded;
  const isSelected = selectedNodeId === node.id;

  const getIcon = () => {
    switch (node.type) {
      case 'location':
        return (
          <img
            src="/src/assets/location.png"
            alt="Location"
            className="w-5 h-5"
          />
        );
      case 'asset':
        return (
          <img src="/src/assets/asset.png" alt="Asset" className="w-5 h-5" />
        );
      case 'component':
        return (
          <img
            src="/src/assets/component.png"
            alt="Component"
            className="w-5 h-5"
          />
        );
      default:
        return (
          <img src="/src/assets/asset.png" alt="Default" className="w-5 h-5" />
        );
    }
  };

  const getStatusIndicator = () => {
    if (node.status === 'alert') {
      return (
        <div
          data-testid="status-indicator"
          className="w-2 h-2 bg-[#ED3833] rounded-full"
        ></div>
      );
    }
    if (node.status === 'operating') {
      return (
        <div
          data-testid="status-indicator"
          className="w-2 h-2 bg-[#52C41A] rounded-full"
        ></div>
      );
    }
    return null;
  };

  const getSensorTypeIcon = () => {
    if (node.sensorType === 'energy') {
      return <Zap className="w-4 h-4 text-[#52C41A] fill-current" />;
    }
    return null;
  };

  const handleNodeClick = () => {
    onSelect(node);
  };

  return (
    <div className="select-none">
      <div
        data-testid="tree-node"
        className={`flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer transition-colors relative ${
          level > 0 ? 'ml-6' : ''
        } ${isSelected ? 'bg-blue-50 border-l-2 border-[#2188FF]' : ''}`}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={handleNodeClick}
      >
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
        )}

        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="w-6 h-6 mr-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6 mr-2" />}

        <span className="mr-2">{getIcon()}</span>

        <span className="text-sm font-medium text-gray-900 mr-2">
          {node.name}
        </span>

        {node.sensorType === 'energy' && (
          <span className="mr-2">{getSensorTypeIcon()}</span>
        )}

        {getStatusIndicator()}
      </div>

      {hasChildren && isExpanded && (
        <div className="relative">
          {node.children.map((child: TreeNode, index: number) => (
            <div key={child.id} className="relative">
              {index < node.children.length - 1 && (
                <div className="absolute border-l-2 left-6 top-0 bottom-0 w-px bg-gray-200"></div>
              )}
              <TreeNodeComponent
                node={child}
                level={level + 1}
                onToggle={onToggle}
                onSelect={onSelect}
                selectedNodeId={selectedNodeId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNodeComponent;
