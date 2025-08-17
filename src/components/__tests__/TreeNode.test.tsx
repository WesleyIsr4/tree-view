import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TreeNode from '../../features/assets/TreeNode';
import type { TreeNode as TreeNodeType } from '../../types';

const mockNode: TreeNodeType = {
  id: '1',
  name: 'Test Node',
  type: 'asset',
  parentId: null,
  locationId: null,
  children: [],
  isExpanded: true,
  isVisible: true,
};

const mockNodeWithChildren: TreeNodeType = {
  id: '1',
  name: 'Parent Node',
  type: 'location',
  parentId: null,
  locationId: null,
  children: [
    {
      id: '2',
      name: 'Child Node',
      type: 'component',
      parentId: '1',
      locationId: null,
      sensorType: 'energy',
      status: 'operating',
      children: [],
      isExpanded: false,
      isVisible: true,
    },
  ],
  isExpanded: true,
  isVisible: true,
};

describe('TreeNode', () => {
  it('renders node name', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    render(
      <TreeNode
        node={mockNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('renders correct icon for each type', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();

    const locationNode = { ...mockNode, type: 'location' as const };
    const { rerender } = render(
      <TreeNode
        node={locationNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );
    expect(screen.getByText('Test Node')).toBeInTheDocument();

    const assetNode = { ...mockNode, type: 'asset' as const };
    rerender(
      <TreeNode
        node={assetNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );
    expect(screen.getByText('Test Node')).toBeInTheDocument();

    const componentNode = { ...mockNode, type: 'component' as const };
    rerender(
      <TreeNode
        node={componentNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );
    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('renders toggle button when there are children', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    render(
      <TreeNode
        node={mockNodeWithChildren}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('calls onToggle when button is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    render(
      <TreeNode
        node={mockNodeWithChildren}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onSelect when node is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    render(
      <TreeNode
        node={mockNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    const nodeElement = screen.getByText('Test Node').closest('div');
    fireEvent.click(nodeElement!);

    expect(mockOnSelect).toHaveBeenCalledWith(mockNode);
  });

  it('renders component status indicator', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    const componentNode = {
      ...mockNode,
      type: 'component' as const,
      status: 'alert' as const,
    };
    render(
      <TreeNode
        node={componentNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    const statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass(
      'w-2',
      'h-2',
      'bg-[#ED3833]',
      'rounded-full'
    );
  });

  it('renders sensor type', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    const componentNode = {
      ...mockNode,
      type: 'component' as const,
      sensorType: 'energy' as const,
    };
    render(
      <TreeNode
        node={componentNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId={null}
      />
    );

    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('applies selection style when selected', () => {
    const mockOnToggle = vi.fn();
    const mockOnSelect = vi.fn();
    render(
      <TreeNode
        node={mockNode}
        level={0}
        onToggle={mockOnToggle}
        onSelect={mockOnSelect}
        selectedNodeId="1"
      />
    );

    const nodeElement = screen.getByText('Test Node').closest('div');
    expect(nodeElement).toHaveClass(
      'bg-blue-50',
      'border-l-2',
      'border-[#2188FF]'
    );
  });
});
