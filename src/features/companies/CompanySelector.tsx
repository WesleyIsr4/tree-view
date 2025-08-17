import React from 'react';
import { Container } from 'lucide-react';
import type { Company } from '../../types';

interface CompanySelectorProps {
  companies: Company[];
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
  isLoading: boolean;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  selectedCompany,
  onCompanySelect,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-[#17192D] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-white">Carregando empresas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#17192D] px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white font-semibold text-lg mr-8">TRACTIAN</div>
      </div>

      <div className="flex gap-2">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => onCompanySelect(company)}
            className={`px-2 py-1 rounded-sm text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm ${
              selectedCompany?.id === company.id
                ? 'bg-[#2188FF]'
                : 'bg-[#023B78] hover:bg-[#1a5a9a]'
            }`}
          >
            <Container className="w-3.5 h-3.5 text-white" />
            <span>{company.name} Unit</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanySelector;
