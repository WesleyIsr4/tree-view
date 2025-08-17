import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AssetDetails from '../../features/assets/AssetDetails';
import type { Asset } from '../../types';

describe('AssetDetails', () => {
  const mockAsset: Asset = {
    id: '1',
    name: 'Motor H12D',
    status: 'operating',
    sensorType: 'energy',
    sensorId: 'RWET667',
    gatewayId: '86GTFD7',
    locationId: 'PRODUCTION AREA',
    parentId: 'MACHINERY HOUSE',
  };

  const mockAsset2: Asset = {
    id: '2',
    name: 'Motor H12D - Stage 1',
    status: 'alert',
    sensorType: 'vibration',
    sensorId: 'RWET668',
    gatewayId: '86GTFD8',
    locationId: 'PRODUCTION AREA',
    parentId: 'MACHINERY HOUSE',
  };

  it('renders asset information correctly', () => {
    render(<AssetDetails asset={mockAsset} />);

    expect(screen.getByText('Motor H12D')).toBeInTheDocument();
    expect(screen.getByText('RWET667')).toBeInTheDocument();
    expect(screen.getByText('86GTFD7')).toBeInTheDocument();
  });

  it('renders energy sensor information correctly', () => {
    render(<AssetDetails asset={mockAsset} />);

    expect(screen.getByText('Energia')).toBeInTheDocument();
  });

  it('renders alert status correctly', () => {
    render(<AssetDetails asset={mockAsset2} />);

    expect(screen.getByText('Alerta')).toBeInTheDocument();
  });

  it('renders no asset message when asset is null', () => {
    render(<AssetDetails asset={null} />);

    expect(
      screen.getByText('Selecione um item para ver os detalhes')
    ).toBeInTheDocument();
  });

  it('renders asset without sensor information', () => {
    const assetWithoutSensor: Asset = {
      id: '3',
      name: 'Asset without sensor',
      parentId: null,
      locationId: null,
    };

    render(<AssetDetails asset={assetWithoutSensor} />);

    expect(screen.getByText('Asset without sensor')).toBeInTheDocument();
  });

  it('renders asset with location information', () => {
    render(<AssetDetails asset={mockAsset} />);

    expect(screen.getByText('PRODUCTION AREA')).toBeInTheDocument();
  });

  it('renders asset with parent information', () => {
    render(<AssetDetails asset={mockAsset} />);

    expect(screen.getByText('MACHINERY HOUSE')).toBeInTheDocument();
  });

  it('renders all asset information when available', () => {
    render(<AssetDetails asset={mockAsset} />);

    expect(screen.getByText('Motor H12D')).toBeInTheDocument();
    expect(screen.getByText('RWET667')).toBeInTheDocument();
    expect(screen.getByText('86GTFD7')).toBeInTheDocument();
    expect(screen.getByText('PRODUCTION AREA')).toBeInTheDocument();
    expect(screen.getByText('MACHINERY HOUSE')).toBeInTheDocument();
  });

  it('should handle image upload for asset', async () => {
    render(<AssetDetails asset={mockAsset} />);

    const uploadArea = screen
      .getByText('Adicionar imagem do Ativo')
      .closest('div');
    expect(uploadArea).toBeInTheDocument();

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByDisplayValue('') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(
      screen.queryByText('Adicionar imagem do Ativo')
    ).not.toBeInTheDocument();
  });

  it('should maintain separate images for different assets', async () => {
    const { rerender } = render(<AssetDetails asset={mockAsset} />);

    const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
    const input = screen.getByDisplayValue('') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file1] } });

    await new Promise((resolve) => setTimeout(resolve, 100));

    rerender(<AssetDetails asset={mockAsset2} />);

    expect(screen.getByText('Adicionar imagem do Ativo')).toBeInTheDocument();

    rerender(<AssetDetails asset={mockAsset} />);

    expect(
      screen.queryByText('Adicionar imagem do Ativo')
    ).not.toBeInTheDocument();
  });

  it('should show image preview after upload', async () => {
    render(<AssetDetails asset={mockAsset} />);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByDisplayValue('') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const img = screen.getByAltText('Imagem do ativo');
    expect(img).toBeInTheDocument();
  });

  it('should allow changing image by clicking on existing image', async () => {
    render(<AssetDetails asset={mockAsset} />);

    const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
    const input = screen.getByDisplayValue('') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file1] } });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const img = screen.getByAltText('Imagem do ativo');
    expect(img).toBeInTheDocument();

    const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file2] } });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(img).toBeInTheDocument();
  });
});
