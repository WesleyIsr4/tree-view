import { useState, useEffect, useCallback } from 'react';
import type { Company } from '../../types';
import { api } from '../../services/api';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const companiesData = await api.getCompanies();
      setCompanies(companiesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar empresas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return {
    companies,
    isLoading,
    error,
    reloadCompanies: loadCompanies,
  };
};
