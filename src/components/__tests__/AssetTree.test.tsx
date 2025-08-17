import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AssetTree from '../../features/assets/AssetTree';
import type { TreeNode as TreeNodeType } from '../../types';

const mockNodes: TreeNodeType[] = [
  {
    id: '1',
    name: 'Location 1',
    type: 'location',
    parentId: null,
    locationId: null,
    children: [],
    isExpanded: true,
    isVisible: true,
  },
  {
    id: '2',
    name: 'Asset 1',
    type: 'asset',
    parentId: null,
    locationId: null,
    children: [],
    isExpanded: true,
    isVisible: true,
  },
];

describe('AssetTree', () => {
  it('renders all nodes', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();

    render(
      <AssetTree
        nodes={mockNodes}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
  });

  it('renders message when there are no nodes', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();

    render(
      <AssetTree
        nodes={[]}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
  });

  it('passes correct props to TreeNode', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();

    render(
      <AssetTree
        nodes={mockNodes}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId="1"
      />
    );

    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
  });
});
