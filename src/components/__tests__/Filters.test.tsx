import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filters from '../../features/filters/Filters';
import type { FilterState } from '../../types';

const mockFilters: FilterState = {
  searchText: '',
  energySensors: false,
  criticalStatus: false,
};

describe('Filters', () => {
  it('renders all filter fields', () => {
    const mockOnFiltersChange = vi.fn();
    render(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByText('Sensores de Energia')).toBeInTheDocument();
    expect(screen.getByText('Crítico')).toBeInTheDocument();
  });

  it('updates energy sensors filter', () => {
    const mockOnFiltersChange = vi.fn();
    render(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    const energyButton = screen.getByText('Sensores de Energia');
    fireEvent.click(energyButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      energySensors: true,
    });
  });

  it('updates critical status filter', () => {
    const mockOnFiltersChange = vi.fn();
    render(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    const criticalButton = screen.getByText('Crítico');
    fireEvent.click(criticalButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      criticalStatus: true,
    });
  });

  it('maintains existing values when updating a filter', () => {
    const mockOnFiltersChange = vi.fn();
    const filtersWithValues: FilterState = {
      searchText: 'teste',
      energySensors: true,
      criticalStatus: false,
    };

    render(
      <Filters
        filters={filtersWithValues}
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const criticalButton = screen.getByText('Crítico');
    fireEvent.click(criticalButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      searchText: 'teste',
      energySensors: true,
      criticalStatus: true,
    });
  });

  it('displays counters when filters are active', () => {
    const mockOnFiltersChange = vi.fn();
    const activeFilters: FilterState = {
      searchText: '',
      energySensors: true,
      criticalStatus: false,
    };

    render(
      <Filters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        energySensorsCount={5}
        criticalStatusCount={3}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
