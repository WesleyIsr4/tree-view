import React, { useState } from 'react';
import { Filter, X, Search, Zap, AlertTriangle } from 'lucide-react';
import type { FilterState } from '../../types';

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  energySensorsCount: number;
  criticalStatusCount: number;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
  energySensorsCount,
  criticalStatusCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.searchText ||
    filters.energySensors ||
    filters.criticalStatus ||
    filters.itemType;

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar Ativo ou Local"
              value={filters.searchText}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-md transition-colors ${
                isExpanded
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Filtros avançados"
            >
              <Filter className="w-4 h-4" />
            </button>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Limpar filtros"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-gray-25">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Filtros Avançados
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.energySensors}
                  onChange={(e) =>
                    handleFilterChange('energySensors', e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Sensores de Energia
                  </span>
                  {filters.energySensors && energySensorsCount > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                      {energySensorsCount}
                    </span>
                  )}
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.criticalStatus}
                  onChange={(e) =>
                    handleFilterChange('criticalStatus', e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Status Crítico
                  </span>
                  {filters.criticalStatus && criticalStatusCount > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                      {criticalStatusCount}
                    </span>
                  )}
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Busca por Tipo
                </label>
                <select
                  value={filters.itemType}
                  onChange={(e) =>
                    handleFilterChange('itemType', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos os tipos</option>
                  <option value="location">Apenas localizações</option>
                  <option value="asset">Apenas ativos</option>
                  <option value="component">Apenas componentes</option>
                </select>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Filtros ativos:{' '}
                  {Object.values(filters).filter(Boolean).length}
                </span>
                <button
                  onClick={onReset}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Limpar todos os filtros
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
