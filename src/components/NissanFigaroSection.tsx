import React, { useState } from 'react';
import { FIGARO_SEASONAL_COLORS, FIGARO_TECHNICAL_SPECS, FigaroColorway } from '../data/figaroData';
import { Currency, Vehicle } from '../types/vehicle';
import { formatMileage, formatPrice } from '../services/storage';
import { Check, Info, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface NissanFigaroSectionProps {
  figaroVehicle?: Vehicle;
  currentCurrency: Currency;
  onEnquire: (vehicle: Vehicle) => void;
  onViewDetails: (vehicle: Vehicle) => void;
  onSourcingRequest: (modelName: string) => void;
}

export const NissanFigaroSection: React.FC<NissanFigaroSectionProps> = ({
  figaroVehicle,
  currentCurrency,
  onEnquire,
  onViewDetails,
  onSourcingRequest
}) => {
  const [selectedColor, setSelectedColor] = useState<FigaroColorway>(FIGARO_SEASONAL_COLORS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'history'>('overview');

  return (
    <section id="figaro" className="py-20 bg-[#F8F6F0] text-[#111111] border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] font-semibold mb-2">
              <span>Iconic Pike Factory Heritage</span>
              <span aria-hidden="true">·</span>
              <span>1991 Limited Edition</span>
              <span aria-hidden="true">·</span>
              <span>Tokyo, Japan</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-brand tracking-tight text-[#111111]">
              Nissan Figaro Dedicated Showcase
            </h2>
          </div>
          <div className="text-sm text-[#555555] max-w-md">
            The cult-classic retro convertible designed by Shoji Takahashi. Hand-assembled at the Pike Factory in Yokosuka, limited to approximately 20,000 units by public lottery.
          </div>
        </div>

        {/* Featured Vehicle & Hero Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Visual Column */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#E8E8E8] overflow-hidden shadow-sm">
            <div className="relative aspect-[16/9] w-full bg-[#111111] overflow-hidden">
              <img
                src="/src/assets/images/nissan_figaro_showcase_1793978772213.jpg"
                alt="1991 Nissan Figaro in Pale Aqua on a picturesque Kyoto cherry blossom street"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded">
                Tokyo Auction Verified · Grade 4.5
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#111111] px-3 py-1 text-xs font-medium rounded shadow">
                Authentic Japanese Kyoto Background
              </div>
            </div>

            {/* In-Stock Status Box */}
            <div className="p-6 border-t border-[#E8E8E8] bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-numbers text-[#777777]">Stock #EJI-FIG-9101</span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                      In Stock · Available
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mt-1">
                    1991 Nissan Figaro 1.0 Turbo Convertible
                  </h3>
                  <div className="text-xs text-[#666666] mt-0.5">
                    Location: Yokohama Port Hub, Japan · JEVIC Verified Mileage
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#777777] uppercase tracking-wider">Direct Price</div>
                  <div className="text-2xl font-bold font-mono-numbers text-[#111111]">
                    {figaroVehicle
                      ? formatPrice(figaroVehicle.priceJPY, currentCurrency)
                      : formatPrice(2950000, currentCurrency)}
                  </div>
                  <div className="text-[11px] text-[#777777]">
                    Includes Japanese Export Certificate
                  </div>
                </div>
              </div>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                <div>
                  <span className="text-[#888888] block text-[11px]">Mileage</span>
                  <span className="font-semibold font-mono-numbers">
                    {figaroVehicle
                      ? formatMileage(figaroVehicle.mileageKm, currentCurrency)
                      : '64,200 km'}
                  </span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[11px]">Engine</span>
                  <span className="font-semibold">0.98L Turbo I4</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[11px]">Transmission</span>
                  <span className="font-semibold">3-Speed Auto</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[11px]">Condition</span>
                  <span className="font-semibold text-emerald-700">Grade 4.5 / Collector</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F0F0F0]">
                {figaroVehicle && (
                  <>
                    <button
                      onClick={() => onEnquire(figaroVehicle)}
                      className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire on This Figaro</span>
                    </button>
                    <button
                      onClick={() => onViewDetails(figaroVehicle)}
                      className="px-5 py-2.5 bg-white border border-[#CCCCCC] hover:border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                    >
                      Full Vehicle Dossier
                    </button>
                  </>
                )}
                <button
                  onClick={() => onSourcingRequest('Nissan Figaro (Any Season)')}
                  className="px-4 py-2.5 text-xs text-[#666666] hover:text-[#111111] underline transition-colors ml-auto"
                >
                  Request Custom Figaro Sourcing
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Four Seasonal Colors & Heritage Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Seasonal Colors Showcase */}
            <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#777777]" />
                  <span>The Four Seasonal Colors</span>
                </h4>
                <span className="text-xs text-[#777777]">Factory 1991 Palette</span>
              </div>
              <p className="text-xs text-[#555555] mb-5 leading-relaxed">
                Nissan offered the Figaro exclusively in four nuanced paint finishes corresponding to the four seasons, each paired with cream leather Connolly-style upholstery and Art Deco instruments.
              </p>

              {/* Color Swatch Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {FIGARO_SEASONAL_COLORS.map((col) => {
                  const isSelected = selectedColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`text-left p-3 rounded border transition-all ${
                        isSelected
                          ? 'border-[#111111] bg-[#F8F6F0] shadow-sm ring-1 ring-[#111111]'
                          : 'border-[#E0E0E0] hover:border-[#999999] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shadow-inner shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-xs font-semibold text-[#111111] truncate">{col.name}</span>
                      </div>
                      <div className="text-[11px] text-[#777777] font-medium">{col.season}</div>
                      <div className="text-[10px] text-[#999999] mt-0.5 font-mono-numbers">{col.unitsPercentage}</div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Color Card */}
              <div className="p-4 bg-[#F8F6F0] rounded border border-[#E8E8E8] text-xs">
                <div className="font-semibold text-[#111111] flex items-center justify-between mb-1">
                  <span>{selectedColor.name} ({selectedColor.season})</span>
                  <span className="text-[10px] font-mono-numbers text-[#777777]">{selectedColor.japaneseName}</span>
                </div>
                <p className="text-[#555555] leading-relaxed mb-3">
                  {selectedColor.description}
                </p>
                <button
                  onClick={() => onSourcingRequest(`Nissan Figaro in ${selectedColor.name} (${selectedColor.season})`)}
                  className="w-full py-2 bg-[#111111] hover:bg-black text-white text-xs font-medium rounded transition-colors text-center"
                >
                  Source a Figaro in {selectedColor.name}
                </button>
              </div>
            </div>

            {/* Authenticity & Pike Factory Heritage Box */}
            <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm text-xs space-y-3">
              <div className="font-semibold text-sm text-[#111111] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified Figaro Provenance</span>
              </div>
              <ul className="space-y-2 text-[#555555]">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Turbocharged MA10E-T Engine:</strong> Japanese domestic market 987cc turbo with electronic fuel injection and intercooling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Original Retractable Top:</strong> Preserved vinyl soft-top with operational locking mechanism and heated glass rear defrost window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Dry Climate Underbody:</strong> Selected strictly from Kanto and central Japan regions to guarantee clean sills and rust-free battery trays.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Specifications Accordion / Grid */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E8E8] shadow-sm">
          <div className="border-b border-[#E8E8E8] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#111111] font-serif-brand">
                Nissan Figaro Verified Engineering Specifications
              </h3>
              <p className="text-xs text-[#777777]">
                Authentic factory dimensions and powertrain data per Nissan Motor Co., Ltd. (1991)
              </p>
            </div>
            <span className="text-xs font-mono-numbers text-[#888888] bg-[#F8F6F0] px-3 py-1 rounded">
              Model Code: E-FK10
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
            {FIGARO_TECHNICAL_SPECS.map((spec, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between py-2 border-b border-[#F0F0F0]"
              >
                <span className="font-medium text-[#777777]">{spec.label}</span>
                <span className="font-semibold text-[#111111] text-right ml-4 font-mono-numbers">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
