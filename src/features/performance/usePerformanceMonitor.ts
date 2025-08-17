import { useRef, useCallback } from 'react';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  nodeCount: number;
  filterTime: number;
  cacheHitRate: number;
}

export const usePerformanceMonitor = () => {
  const metricsRef = useRef<PerformanceMetrics[]>([]);
  const startTimeRef = useRef<number>(0);

  const startMeasurement = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const endMeasurement = useCallback(
    (nodeCount: number, filterTime: number, cacheHitRate: number) => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;

      let memoryUsage: number | undefined;

      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryUsage = memory.usedJSHeapSize / 1024 / 1024;
      }

      const metrics: PerformanceMetrics = {
        renderTime,
        memoryUsage,
        nodeCount,
        filterTime,
        cacheHitRate,
      };

      metricsRef.current.push(metrics);

      if (metricsRef.current.length > 100) {
        metricsRef.current = metricsRef.current.slice(-100);
      }
    },
    []
  );

  const getAverageMetrics = useCallback(() => {
    if (metricsRef.current.length === 0) return null;

    const sum = metricsRef.current.reduce(
      (acc, metric) => ({
        renderTime: acc.renderTime + metric.renderTime,
        memoryUsage: (acc.memoryUsage || 0) + (metric.memoryUsage || 0),
        nodeCount: acc.nodeCount + metric.nodeCount,
        filterTime: acc.filterTime + metric.filterTime,
        cacheHitRate: acc.cacheHitRate + metric.cacheHitRate,
      }),
      {
        renderTime: 0,
        memoryUsage: 0,
        nodeCount: 0,
        filterTime: 0,
        cacheHitRate: 0,
      }
    );

    const count = metricsRef.current.length;

    return {
      renderTime: sum.renderTime / count,
      memoryUsage: (sum.memoryUsage || 0) / count,
      nodeCount: Math.round(sum.nodeCount / count),
      filterTime: sum.filterTime / count,
      cacheHitRate: sum.cacheHitRate / count,
    };
  }, []);

  const getPerformanceReport = useCallback(() => {
    const average = getAverageMetrics();
    if (!average) return null;

    const latest = metricsRef.current[metricsRef.current.length - 1];
    if (!latest) return null;

    return {
      latest,
      average,
      totalMeasurements: metricsRef.current.length,
      performanceScore: calculatePerformanceScore(average),
    };
  }, [getAverageMetrics]);

  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;

    if (metrics.renderTime > 100) score -= 20;
    else if (metrics.renderTime > 50) score -= 10;

    if (metrics.filterTime > 50) score -= 15;
    else if (metrics.filterTime > 25) score -= 5;

    if (metrics.cacheHitRate < 0.5) score -= 20;
    else if (metrics.cacheHitRate < 0.8) score -= 10;

    if (metrics.nodeCount > 1000) score -= 15;
    else if (metrics.nodeCount > 500) score -= 5;

    return Math.max(0, score);
  };

  const clearMetrics = useCallback(() => {
    metricsRef.current = [];
  }, []);

  return {
    startMeasurement,
    endMeasurement,
    getAverageMetrics,
    getPerformanceReport,
    clearMetrics,
  };
};
