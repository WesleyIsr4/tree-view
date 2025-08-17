import { useState, useMemo, useCallback } from 'react';
import type { TreeNode, FilterState } from '../../types';
import { filterTree } from '../assets/treeBuilder';

export const useTreeFilters = (treeNodes: TreeNode[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    energySensors: false,
    criticalStatus: false,
    itemType: '',
  });

  const { filteredNodes, filterTime } = useMemo(() => {
    if (treeNodes.length === 0) return { filteredNodes: [], filterTime: 0 };

    const startTime = performance.now();
    const filtered = filterTree(treeNodes, filters);
    const endTime = performance.now();
    const filterTime = endTime - startTime;

    return { filteredNodes: filtered, filterTime };
  }, [treeNodes, filters]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchText: '',
      energySensors: false,
      criticalStatus: false,
      itemType: '',
    });
  }, []);

  const toggleEnergySensors = useCallback(
    (value: boolean) => {
      updateFilters({ energySensors: value });
    },
    [updateFilters]
  );

  const toggleCriticalStatus = useCallback(
    (value: boolean) => {
      updateFilters({ criticalStatus: value });
    },
    [updateFilters]
  );

  const updateSearchText = useCallback(
    (searchText: string) => {
      updateFilters({ searchText });
    },
    [updateFilters]
  );

  return {
    filters,
    filteredNodes,
    filterTime,
    updateFilters,
    resetFilters,
    toggleEnergySensors,
    toggleCriticalStatus,
    updateSearchText,
  };
};
