import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Company, TreeNode } from '../../types';
import { api } from '../../services/api';
import { buildTree } from './treeBuilder';

export const useTreeData = (selectedCompany: Company | null) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cacheMetrics, setCacheMetrics] = useState({ hits: 0, misses: 0 });

  const loadCompanyData = useCallback(async (companyId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const [locationsData, assetsData] = await Promise.all([
        api.getLocations(companyId),
        api.getAssets(companyId),
      ]);

      const tree = buildTree(locationsData, assetsData);
      setTreeNodes(tree);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao carregar dados da empresa';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      loadCompanyData(selectedCompany.id);
    } else {
      setTreeNodes([]);
      setError(null);
    }
  }, [selectedCompany, loadCompanyData]);

  const updateNodeExpansion = useCallback((nodeId: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children.length > 0) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setTreeNodes((prev) => updateNode(prev));
  }, []);

  const energySensorsCount = useMemo(() => {
    const countEnergySensors = (nodes: TreeNode[]): number => {
      return nodes.reduce((count, node) => {
        if (node.sensorType === 'energy') count++;
        if (node.children.length > 0)
          count += countEnergySensors(node.children);
        return count;
      }, 0);
    };
    return countEnergySensors(treeNodes);
  }, [treeNodes]);

  const criticalStatusCount = useMemo(() => {
    const countCriticalStatus = (nodes: TreeNode[]): number => {
      return nodes.reduce((count, node) => {
        if (node.status === 'alert') count++;
        if (node.children.length > 0)
          count += countCriticalStatus(node.children);
        return count;
      }, 0);
    };
    return countCriticalStatus(treeNodes);
  }, [treeNodes]);

  const treeStats = useMemo(() => {
    const countNodes = (nodeList: TreeNode[]) => {
      let total = 0;
      let locations = 0;
      let assets = 0;
      let components = 0;

      const traverse = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          total++;
          if (node.type === 'location') locations++;
          else if (node.type === 'asset') assets++;
          else if (node.type === 'component') components++;

          if (node.children.length > 0) {
            traverse(node.children);
          }
        });
      };

      traverse(nodeList);
      return { total, locations, assets, components };
    };

    const { total, locations, assets, components } = countNodes(treeNodes);

    return {
      totalNodes: total,
      locationsCount: locations,
      assetsCount: assets,
      componentsCount: components,
      energySensorsCount,
      criticalStatusCount,
    };
  }, [treeNodes, energySensorsCount, criticalStatusCount]);

  const cacheHitRate = useMemo(() => {
    const total = cacheMetrics.hits + cacheMetrics.misses;
    return total > 0 ? cacheMetrics.hits / total : 0;
  }, [cacheMetrics]);

  const updateCacheMetrics = useCallback((hit: boolean) => {
    setCacheMetrics((prev) => ({
      hits: prev.hits + (hit ? 1 : 0),
      misses: prev.misses + (hit ? 0 : 1),
    }));
  }, []);

  return {
    treeNodes,
    isLoading,
    error,
    energySensorsCount,
    criticalStatusCount,
    treeStats,
    cacheHitRate,
    updateNodeExpansion,
    updateCacheMetrics,
    reloadData: loadCompanyData,
  };
};
