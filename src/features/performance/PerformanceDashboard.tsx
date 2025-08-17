import React, { useState } from 'react';
import { BarChart3, Zap, Clock, TrendingUp, Activity } from 'lucide-react';
import type { PerformanceMetrics } from './usePerformanceMonitor';

interface PerformanceDashboardProps {
  metrics: PerformanceMetrics | null;
  isVisible: boolean;
  onToggle: () => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  metrics,
  isVisible,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Performance Monitor
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={isExpanded ? 'Recolher' : 'Expandir'}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Fechar"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {isExpanded && metrics && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600">Render Time</p>
                <p className="text-lg font-bold text-blue-600">
                  {metrics.renderTime.toFixed(1)}ms
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-xs text-gray-600">Filter Time</p>
                <p className="text-lg font-bold text-yellow-600">
                  {metrics.filterTime.toFixed(1)}ms
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-xs text-gray-600">Node Count</p>
                <p className="text-lg font-bold text-purple-600">
                  {metrics.nodeCount}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-5 h-5 text-green-500">💾</div>
                </div>
                <p className="text-xs text-gray-600">Memory</p>
                <p className="text-lg font-bold text-green-600">
                  {metrics.memoryUsage
                    ? `${metrics.memoryUsage.toFixed(1)}MB`
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Cache Hit Rate
                </span>
                <span className="text-sm text-gray-600">
                  {(metrics.cacheHitRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.cacheHitRate * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
