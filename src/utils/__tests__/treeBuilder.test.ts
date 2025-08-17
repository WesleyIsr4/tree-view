import { describe, it, expect } from 'vitest';
import { buildTree, filterTree } from '../../features/assets/treeBuilder';
import type { Location, Asset, TreeNode } from '../../types';

describe('treeBuilder', () => {
  describe('buildTree', () => {
    it('builds simple tree with location and asset', () => {
      const locations: Location[] = [
        { id: 'loc1', name: 'Location 1', parentId: null },
      ];

      const assets: Asset[] = [
        { id: 'asset1', name: 'Asset 1', locationId: 'loc1', parentId: null },
      ];

      const result = buildTree(locations, assets);

      expect(result).toHaveLength(1);
      const locationNode = result.find((n) => n.type === 'location');
      expect(locationNode).toBeDefined();
      expect(locationNode?.children).toHaveLength(1);
      expect(locationNode?.children[0].id).toBe('asset1');
      expect(locationNode?.children[0].locationId).toBe('loc1');
    });

    it('identifies components by sensorType', () => {
      const locations: Location[] = [];
      const assets: Asset[] = [
        {
          id: 'comp1',
          name: 'Component 1',
          locationId: null,
          parentId: null,
          sensorType: 'energy',
          status: 'operating',
        },
      ];

      const result = buildTree(locations, assets);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('component');
      expect(result[0].sensorType).toBe('energy');
    });

    it('builds nested hierarchy correctly', () => {
      const locations: Location[] = [
        { id: 'loc1', name: 'Location 1', parentId: null },
        { id: 'loc2', name: 'Location 2', parentId: 'loc1' },
      ];

      const assets: Asset[] = [
        { id: 'asset1', name: 'Asset 1', locationId: 'loc2', parentId: null },
        { id: 'asset2', name: 'Asset 2', locationId: null, parentId: 'asset1' },
      ];

      const result = buildTree(locations, assets);

      expect(result).toHaveLength(1);
      const location1 = result.find((n) => n.id === 'loc1');

      expect(location1).toBeDefined();
      expect(location1?.children).toHaveLength(1);
      expect(location1?.children[0].id).toBe('loc2');

      const location2 = location1?.children[0];
      expect(location2?.children).toHaveLength(1);
      expect(location2?.children[0].id).toBe('asset1');

      const asset1 = location2?.children[0];
      expect(asset1?.children).toHaveLength(1);
      expect(asset1?.children[0].id).toBe('asset2');
    });
  });

  describe('filterTree', () => {
    const mockTree: TreeNode[] = [
      {
        id: 'loc1',
        name: 'Location 1',
        type: 'location',
        parentId: null,
        locationId: null,
        children: [
          {
            id: 'comp1',
            name: 'Energy Component',
            type: 'component',
            parentId: 'loc1',
            locationId: null,
            sensorType: 'energy',
            status: 'operating',
            children: [],
            isExpanded: true,
            isVisible: true,
          },
          {
            id: 'comp2',
            name: 'Vibration Component',
            type: 'component',
            parentId: 'loc1',
            locationId: null,
            sensorType: 'vibration',
            status: 'alert',
            children: [],
            isExpanded: true,
            isVisible: true,
          },
        ],
        isExpanded: true,
        isVisible: true,
      },
    ];

    it('filters by search text', () => {
      const filters = {
        searchText: 'Energy',
        energySensors: false,
        criticalStatus: false,
      };
      const result = filterTree(mockTree, filters);

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].name).toBe('Energy Component');
    });

    it('filters by energy sensors', () => {
      const filters = {
        searchText: '',
        energySensors: true,
        criticalStatus: false,
      };
      const result = filterTree(mockTree, filters);

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].sensorType).toBe('energy');
    });

    it('filters by critical status', () => {
      const filters = {
        searchText: '',
        energySensors: false,
        criticalStatus: true,
      };
      const result = filterTree(mockTree, filters);

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].status).toBe('alert');
    });

    it('keeps parents visible when children are filtered', () => {
      const filters = {
        searchText: 'Energy',
        energySensors: false,
        criticalStatus: false,
      };
      const result = filterTree(mockTree, filters);

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].name).toBe('Energy Component');
    });
  });
});
