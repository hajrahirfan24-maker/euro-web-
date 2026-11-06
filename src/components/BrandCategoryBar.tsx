import React from 'react';
import { VehicleBrand } from '../types/vehicle';

interface BrandCategoryBarProps {
  selectedBrand: VehicleBrand | 'All';
  onSelectBrand: (brand: VehicleBrand | 'All') => void;
  brandCounts: Record<string, number>;
}

export const BRANDS: { key: VehicleBrand | 'All'; label: string; origin: 'All' | 'Japan' | 'Germany' | 'Europe' }[] = [
  { key: 'All', label: 'All Marques', origin: 'All' },
  { key: 'Nissan', label: 'Nissan', origin: 'Japan' },
  { key: 'BMW', label: 'BMW', origin: 'Germany' },
  { key: 'Mercedes-Benz', label: 'Mercedes-Benz', origin: 'Germany' },
  { key: 'Toyota', label: 'Toyota', origin: 'Japan' },
  { key: 'Honda', label: 'Honda', origin: 'Japan' },
  { key: 'Lexus', label: 'Lexus', origin: 'Japan' },
  { key: 'Mazda', label: 'Mazda', origin: 'Japan' },
  { key: 'Mitsubishi', label: 'Mitsubishi', origin: 'Japan' },
  { key: 'Subaru', label: 'Subaru', origin: 'Japan' },
  { key: 'Suzuki', label: 'Suzuki', origin: 'Japan' },
  { key: 'Audi', label: 'Audi', origin: 'Germany' },
  { key: 'Volkswagen', label: 'Volkswagen', origin: 'Germany' },
  { key: 'Porsche', label: 'Porsche', origin: 'Germany' },
  { key: 'Other', label: 'Other Marques', origin: 'Europe' }
];

export const BrandCategoryBar: React.FC<BrandCategoryBarProps> = ({
  selectedBrand,
  onSelectBrand,
  brandCounts
}) => {
  return (
    <div className="bg-[#111111] text-white py-8 border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#888888] font-semibold">
              Curated Automotive Marques
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-brand font-semibold text-white mt-1">
              Browse Japanese & European Manufacturers
            </h3>
          </div>
          <p className="text-xs text-[#999999] max-w-md">
            Direct vehicle sourcing from Osaka and Yokohama auctions, plus German and British import logistics.
          </p>
        </div>

        {/* Clean horizontal scrollable category bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BRANDS.map((b) => {
            const count = b.key === 'All'
              ? Object.values(brandCounts).reduce((a, c) => a + c, 0)
              : (brandCounts[b.key] || 0);

            const isSelected = selectedBrand === b.key;

            return (
              <button
                key={b.key}
                onClick={() => onSelectBrand(b.key)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-white text-[#111111] shadow-md font-semibold'
                    : 'bg-[#1C1C1C] text-[#CCCCCC] hover:text-white hover:bg-[#282828] border border-[#2E2E2E]'
                }`}
              >
                <span>{b.label}</span>
                <span
                  className={`text-[10px] font-mono-numbers px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#2A2A2A] text-[#888888]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
