import React, { useState } from 'react';
import { BMW_MODEL_FAMILIES } from '../data/bmwCatalog';
import { BMWModelFamily, Vehicle } from '../types/vehicle';
import { Info, Sparkles, Search, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface BMWDirectorySectionProps {
  onSelectBMWFamily: (family: BMWModelFamily) => void;
  onFilterInventoryBMW: () => void;
  onSourcingRequest: (bmwSeriesName: string) => void;
  inStockBMWVehicles: Vehicle[];
}

export const BMWDirectorySection: React.FC<BMWDirectorySectionProps> = ({
  onSelectBMWFamily,
  onFilterInventoryBMW,
  onSourcingRequest,
  inStockBMWVehicles
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Sedans & Gran Coupes',
    'Coupes & Convertibles',
    'X-Series SAV / SUV',
    'M High-Performance',
    'BMW i Electric',
    'Roadsters'
  ];

  const filteredFamilies = BMW_MODEL_FAMILIES.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.generations.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flagshipVariants.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="bmw" className="py-20 bg-[#111111] text-white border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Banner with Tokyo Night BMW scene */}
        <div className="relative rounded-xl overflow-hidden mb-12 border border-[#2E2E2E]">
          <div className="aspect-[21/9] sm:aspect-[24/8] w-full bg-black">
            <img
              src="/src/assets/images/bmw_tokyo_expressway_1793978772824.jpg"
              alt="BMW M performance sedan along Tokyo Ginza boulevard at night"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A0A0A0] font-semibold mb-2">
              <span>Bayerische Motoren Werke</span>
              <span aria-hidden="true">·</span>
              <span>Japan & European Sourcing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-brand text-white leading-tight">
              The BMW Collection: All Model Families
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed max-w-lg">
              Comprehensive directory spanning all 19 BMW model families, from historic classic chassis (E30, E39, E46) to modern high-performance M power and fifth-generation electric i-Series.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <button
                onClick={onFilterInventoryBMW}
                className="px-5 py-2.5 bg-white text-[#111111] hover:bg-[#E8E8E8] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                View In-Stock BMW ({inStockBMWVehicles.length})
              </button>
              <button
                onClick={() => onSourcingRequest('BMW Direct Sourcing from Japan')}
                className="px-5 py-2.5 bg-transparent border border-white/40 hover:border-white text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Inquire on Any Model
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer Box */}
        <div className="mb-10 p-4 bg-[#1A1A1A] border border-[#333333] rounded-lg flex items-start gap-3 text-xs text-[#BBBBBB]">
          <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Directory vs. In-Stock Inventory Notice: </span>
            This model family directory documents BMW model architectures, generations, and flagship variants available through our international sourcing network in Japan and Germany. Listing a model family does not imply immediate stock on lot. Cars currently ready for dispatch are marked with the green "In Stock" badge.
          </div>
        </div>

        {/* Category Tabs & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-[#111111] font-semibold shadow'
                    : 'bg-[#1C1C1C] text-[#A0A0A0] hover:text-white hover:bg-[#282828] border border-[#2E2E2E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search BMW series or chassis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Model Families Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFamilies.map((family) => {
            const inStockForThisSeries = inStockBMWVehicles.filter(
              (v) => v.model.toLowerCase().includes(family.series.replace('BMW ', '').toLowerCase()) ||
                     (family.series === 'BMW M Motorsport' && v.model.includes('M3') || v.model.includes('M4'))
            );
            const hasStock = inStockForThisSeries.length > 0;

            return (
              <div
                key={family.id}
                className="bg-[#181818] border border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between hover:border-[#444444] transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#888888] font-medium block">
                        {family.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-white">
                        {family.series}
                      </h3>
                    </div>

                    {hasStock ? (
                      <span className="text-[11px] font-medium px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                        {inStockForThisSeries.length} In Stock
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#777777] px-2 py-0.5 bg-[#202020] rounded border border-[#2E2E2E]">
                        Sourcing Order
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#999999] mb-3 leading-relaxed">
                    {family.description}
                  </p>

                  <div className="space-y-2 text-xs border-t border-[#262626] pt-3">
                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase tracking-wider">Generations</span>
                      <span className="text-[#CCCCCC] font-mono-numbers text-[11px]">{family.generations}</span>
                    </div>

                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase tracking-wider">Key Variants</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {family.flagshipVariants.map((variant, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-[#AAAAAA] bg-[#222222] px-2 py-0.5 rounded"
                          >
                            {variant}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#262626] flex items-center justify-between">
                  {hasStock ? (
                    <button
                      onClick={onFilterInventoryBMW}
                      className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                    >
                      <span>View in Stockroom</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#777777]">
                      Import from Japan / Germany
                    </span>
                  )}

                  <button
                    onClick={() => onSourcingRequest(family.series)}
                    className="text-xs px-3 py-1.5 bg-[#252525] hover:bg-white hover:text-[#111111] text-white font-medium rounded transition-colors"
                  >
                    Request Sourcing
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
