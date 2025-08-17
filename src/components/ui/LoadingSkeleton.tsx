import React from 'react';

interface LoadingSkeletonProps {
  type?: 'tree' | 'details' | 'company';
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'tree',
  lines = 3,
}) => {
  if (type === 'company') {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md mb-2" />
        <div className="h-10 bg-gray-200 rounded-md mb-2" />
        <div className="h-10 bg-gray-200 rounded-md" />
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded flex-1" />
        </div>
      ))}
    </div>
  );
};

export const TreeLoadingSkeleton: React.FC = () => (
  <div className="p-4 space-y-3">
    <LoadingSkeleton type="tree" lines={5} />
  </div>
);

export const DetailsLoadingSkeleton: React.FC = () => (
  <div className="p-6">
    <LoadingSkeleton type="details" />
  </div>
);
