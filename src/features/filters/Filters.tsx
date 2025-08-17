import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import type { FilterState } from '../../types';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  energySensorsCount?: number;
  criticalStatusCount?: number;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFiltersChange,
  energySensorsCount = 0,
  criticalStatusCount = 0,
}) => {
  const handleEnergySensorsChange = (energySensors: boolean) => {
    onFiltersChange({ ...filters, energySensors });
  };

  const handleCriticalStatusChange = (criticalStatus: boolean) => {
    onFiltersChange({ ...filters, criticalStatus });
  };

  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <button
        onClick={() => handleEnergySensorsChange(!filters.energySensors)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
          filters.energySensors
            ? 'bg-[#2188FF] text-white shadow-sm'
            : 'bg-white text-[#77818C] border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Zap className="w-4 h-4" />
        <span>Sensores de Energia</span>
        {filters.energySensors && energySensorsCount > 0 && (
          <span className="bg-white text-[#2188FF] text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center">
            {energySensorsCount}
          </span>
        )}
      </button>

      <button
        onClick={() => handleCriticalStatusChange(!filters.criticalStatus)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
          filters.criticalStatus
            ? 'bg-[#2188FF] text-white shadow-sm'
            : 'bg-white text-[#77818C] border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <AlertCircle className="w-4 h-4" />
        <span>Crítico</span>
        {filters.criticalStatus && criticalStatusCount > 0 && (
          <span className="bg-white text-[#2188FF] text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center">
            {criticalStatusCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default Filters;
