import { Zap, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Company, TreeNode } from './types';
import { TreeProvider, useTreeContext } from './contexts/TreeContext';
import { useCompanies } from './features/companies/useCompanies';
import { useTreeData } from './features/assets/useTreeData';
import { useTreeFilters } from './features/filters/useTreeFilters';
import { useToast } from './hooks/ui/useToast';
import { usePerformanceMonitor } from './features/performance/usePerformanceMonitor';
import { convertTreeNodeToAsset } from './features/assets/assetConverter';
import CompanySelector from './features/companies/CompanySelector';
import AssetTree from './features/assets/AssetTree';
import { VirtualizedTree } from './features/assets/VirtualizedTree';
import AssetDetails from './features/assets/AssetDetails';
import { TreeLoadingSkeleton } from './components/ui/LoadingSkeleton';
import { ToastContainer } from './components/ui/Toast';
import { AdvancedFilters } from './features/filters/AdvancedFilters';
import { PerformanceDashboard } from './features/performance/PerformanceDashboard';

function AppContent() {
  const { state, dispatch } = useTreeContext();
  const {
    companies,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useCompanies();
  const {
    treeNodes,
    isLoading: isLoadingTree,
    error: treeError,
    energySensorsCount,
    criticalStatusCount,
    cacheHitRate,
    updateNodeExpansion,
  } = useTreeData(state.selectedCompany);

  const {
    filters,
    filteredNodes,
    filterTime,
    toggleEnergySensors,
    toggleCriticalStatus,
    updateSearchText,
    resetFilters,
  } = useTreeFilters(treeNodes);

  const { toasts, removeToast, showSuccess } = useToast();
  const { startMeasurement, endMeasurement, getPerformanceReport } =
    usePerformanceMonitor();

  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [useVirtualization, setUseVirtualization] = useState(false);

  const handleCompanySelect = (company: Company) => {
    dispatch({ type: 'SET_SELECTED_COMPANY', payload: company });
    showSuccess(
      'Empresa selecionada',
      `${company.name} foi selecionada com sucesso!`
    );
  };

  const handleNodeSelect = (node: TreeNode) => {
    dispatch({ type: 'SET_SELECTED_NODE', payload: node });
  };

  const handleToggleNode = (nodeId: string) => {
    updateNodeExpansion(nodeId);
  };

  const handleFiltersChange = (newFilters: any) => {
    if (newFilters.searchText !== undefined) {
      updateSearchText(newFilters.searchText);
    }
    if (newFilters.energySensors !== undefined) {
      toggleEnergySensors(newFilters.energySensors);
    }
    if (newFilters.criticalStatus !== undefined) {
      toggleCriticalStatus(newFilters.criticalStatus);
    }
  };

  useEffect(() => {
    if (!isLoadingTree && treeNodes.length > 0) {
      startMeasurement();
    }
  }, [isLoadingTree, treeNodes.length, startMeasurement]);

  useEffect(() => {
    if (filteredNodes.length > 0) {
      endMeasurement(filteredNodes.length, filterTime, cacheHitRate);
    }
  }, [filteredNodes.length, filterTime, cacheHitRate, endMeasurement]);

  if (companiesError) {
    return (
      <div className="min-h-screen bg-[#E3EAEF] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Erro ao carregar empresas
          </h2>
          <p className="text-gray-600">{companiesError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E3EAEF]">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <CompanySelector
        companies={companies}
        selectedCompany={state.selectedCompany}
        onCompanySelect={handleCompanySelect}
        isLoading={isLoadingCompanies}
      />

      {state.selectedCompany && (
        <div className="h-full p-2">
          <div className="bg-white h-screen shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-[#24292F]">
                    Ativos
                  </h2>
                  <span className="text-sm text-[#77818C]">
                    / {state.selectedCompany.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => toggleEnergySensors(!filters.energySensors)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                      filters.energySensors
                        ? 'bg-[#2188FF] text-white shadow-sm'
                        : 'bg-white text-[#77818C] border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Sensor de Energia</span>
                    {filters.energySensors && energySensorsCount > 0 && (
                      <span
                        className={
                          'bg-white text-[#2188FF] text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center'
                        }
                      >
                        {energySensorsCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      toggleCriticalStatus(!filters.criticalStatus)
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                      filters.criticalStatus
                        ? 'bg-[#2188FF] text-white shadow-sm'
                        : 'bg-white text-[#77818C] border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Crítico</span>
                    {filters.criticalStatus && criticalStatusCount > 0 && (
                      <span
                        className={
                          'bg-white text-[#2188FF] text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center'
                        }
                      >
                        {criticalStatusCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setShowPerformanceMonitor(!showPerformanceMonitor)
                    }
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    title="Monitor de Performance"
                  >
                    📊
                  </button>

                  <button
                    onClick={() => setUseVirtualization(!useVirtualization)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      useVirtualization
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    title="Alternar Virtualização"
                  >
                    {useVirtualization ? '🔄' : '⚡'}
                  </button>
                </div>
              </div>
            </div>

            {treeError && (
              <div className="p-4 bg-red-50 border-l-4 border-red-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{treeError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 p-2">
              <div className="xl:col-span-1 space-y-2 border border-gray-200 rounded-md">
                <AdvancedFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={resetFilters}
                  energySensorsCount={energySensorsCount}
                  criticalStatusCount={criticalStatusCount}
                />

                {isLoadingTree ? (
                  <TreeLoadingSkeleton />
                ) : useVirtualization ? (
                  <div className="bg-white border border-gray-200 rounded-md">
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          ⚡ Árvore Virtualizada
                        </span>
                        <span className="text-xs text-gray-500">
                          ({filteredNodes.length} itens)
                        </span>
                      </div>
                    </div>
                    <VirtualizedTree
                      nodes={filteredNodes}
                      onToggle={handleToggleNode}
                      onSelect={handleNodeSelect}
                      selectedNodeId={state.selectedNode?.id || null}
                      height={400}
                      itemHeight={48}
                    />
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    <AssetTree
                      nodes={filteredNodes}
                      onToggle={handleToggleNode}
                      onSelect={handleNodeSelect}
                      selectedNodeId={state.selectedNode?.id || null}
                    />
                  </div>
                )}
              </div>

              <div className="xl:col-span-2">
                <AssetDetails
                  asset={
                    state.selectedNode
                      ? convertTreeNodeToAsset(state.selectedNode)
                      : null
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <PerformanceDashboard
        metrics={getPerformanceReport()?.latest || null}
        isVisible={showPerformanceMonitor}
        onToggle={() => setShowPerformanceMonitor(false)}
      />
    </div>
  );
}

function App() {
  return (
    <TreeProvider>
      <AppContent />
    </TreeProvider>
  );
}

export default App;
