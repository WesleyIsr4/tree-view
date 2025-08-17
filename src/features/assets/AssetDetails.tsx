import React, { useState, useRef, useEffect } from 'react';
import {
  Package,
  Upload,
  Wifi,
  Router,
  MapPin,
  GitBranch,
  Inbox,
} from 'lucide-react';
import type { Asset } from '../../types';

interface AssetDetailsProps {
  asset: Asset | null;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  const [assetImages, setAssetImages] = useState<Record<string, string | null>>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentImage = asset ? assetImages[asset.id] : null;

  useEffect(() => {
    if (asset && !(asset.id in assetImages)) {
      setAssetImages((prev) => ({ ...prev, [asset.id]: null }));
    }
  }, [asset, assetImages]);

  if (!asset) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <div className="text-center text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">
            Selecione um item para ver os detalhes
          </p>
          <p className="text-sm">
            Clique em um item na árvore para ver seus detalhes
          </p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && asset) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAssetImages((prev) => ({
          ...prev,
          [asset.id]: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = () => {
    if (asset.status === 'alert') return 'bg-red-500';
    if (asset.status === 'operating') return 'bg-green-500';
    return 'bg-gray-400';
  };

  const getStatusText = () => {
    if (asset.status === 'alert') return 'Alerta';
    if (asset.status === 'operating') return 'Operando';
    return 'Desconhecido';
  };

  const getSensorTypeText = () => {
    if (asset.sensorType === 'vibration') return 'Vibração';
    if (asset.sensorType === 'energy') return 'Energia';
    return 'N/A';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[#24292F]">
              {asset.name}
            </h2>
            {asset.status && (
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div
            className="bg-[#F2F8FF] border border-[#55A6FF] border-dashed rounded-md p-4 w-[336px] h-[226px] flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-[#E8F4FF] transition-colors"
            onClick={handleImageClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {currentImage ? (
              <div className="w-full h-full relative group">
                <img
                  src={currentImage}
                  alt="Imagem do ativo"
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-md flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Clique para alterar</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Inbox className="w-[42px] h-[42px] mx-auto mb-2 text-[#55A6FF]" />
                <p className="text-sm text-[#55A6FF]">
                  Adicionar imagem do Ativo
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-[#24292F] mb-2">
                Tipo de Equipamento
              </h3>
              <p className="text-base text-[#88929C]">
                Motor Elétrico (Trifásico)
              </p>
            </div>

            {asset.locationId && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-semibold text-[#24292F] mb-2">
                  Localização
                </h3>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#2188FF]" />
                  <span className="text-base text-[#88929C]">
                    {asset.locationId}
                  </span>
                </div>
              </div>
            )}

            {asset.parentId && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-semibold text-[#24292F] mb-2">
                  Item Pai
                </h3>
                <div className="flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-[#2188FF]" />
                  <span className="text-base text-[#88929C]">
                    {asset.parentId}
                  </span>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-[#24292F] mb-2">
                Responsáveis
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#2188FF] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">E</span>
                </div>
                <span className="text-base text-[#88929C]">Elétrica</span>
              </div>
            </div>
          </div>
        </div>

        {(asset.sensorId || asset.gatewayId) && (
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {asset.sensorId && (
                <div>
                  <h3 className="text-base font-semibold text-[#24292F] mb-2">
                    Sensor
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded flex items-center justify-center">
                      <Wifi className="w-3 h-3 text-[#2188FF]" />
                    </div>
                    <span className="text-base text-[#88929C]">
                      {asset.sensorId}
                    </span>
                  </div>
                </div>
              )}

              {asset.gatewayId && (
                <div>
                  <h3 className="text-base font-semibold text-[#24292F] mb-2">
                    Receptor
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded flex items-center justify-center">
                      <Router className="w-3 h-3 text-[#2188FF]" />
                    </div>
                    <span className="text-base text-[#88929C]">
                      {asset.gatewayId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(asset.sensorType || asset.status) && (
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {asset.sensorType && (
                <div>
                  <h3 className="text-base font-semibold text-[#24292F] mb-2">
                    Tipo de Sensor
                  </h3>
                  <span className="text-base text-[#88929C]">
                    {getSensorTypeText()}
                  </span>
                </div>
              )}

              {asset.status && (
                <div>
                  <h3 className="text-base font-semibold text-[#24292F] mb-2">
                    Status
                  </h3>
                  <span className="text-base text-[#88929C]">
                    {getStatusText()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;
