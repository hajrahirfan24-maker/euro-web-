import React from 'react';
import { Vehicle, Currency } from '../types/vehicle';
import { formatMileage, formatPrice } from '../services/storage';
import { MapPin, Gauge, Fuel, Cog, ShieldCheck, Eye, MessageSquare } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  currentCurrency: Currency;
  onViewDetails: (vehicle: Vehicle) => void;
  onEnquire: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  currentCurrency,
  onViewDetails,
  onEnquire
}) => {
  const getAvailabilityBadge = (status: Vehicle['availability']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Transit':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Reserved':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Sold':
        return 'bg-neutral-200 text-neutral-700 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E8E8E8] overflow-hidden flex flex-col justify-between hover:border-[#111111] hover:shadow-md transition-all duration-300 group">
      <div>
        {/* Image Frame with Badges */}
        <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden cursor-pointer" onClick={() => onViewDetails(vehicle)}>
          <img
            src={vehicle.images[0] || '/src/assets/images/hero_japanese_automotive_1793978771369.jpg'}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback
              (e.target as HTMLImageElement).src = '/src/assets/images/hero_japanese_automotive_1793978771369.jpg';
            }}
          />

          {/* Top badging */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border shadow-sm ${getAvailabilityBadge(vehicle.availability)}`}>
              {vehicle.availability}
            </span>
            {vehicle.isFeatured && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-black/80 text-white rounded border border-white/20 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          {/* Stock ID & Grade bottom overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[11px] text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded">
            <span className="font-mono-numbers text-white/80">{vehicle.stockNumber}</span>
            <span className="font-medium text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {vehicle.conditionGrade}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {/* Brand & Year Header */}
          <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#111111]">{vehicle.brand}</span>
            <span className="font-mono-numbers">{vehicle.year}</span>
          </div>

          {/* Model Title */}
          <h4
            onClick={() => onViewDetails(vehicle)}
            className="text-base sm:text-lg font-bold text-[#111111] leading-snug group-hover:text-black cursor-pointer line-clamp-1"
          >
            {vehicle.model}
          </h4>

          {/* SubModel & Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#666666] mt-1 mb-4">
            <MapPin className="w-3 h-3 text-[#888888] shrink-0" />
            <span className="truncate">{vehicle.location}</span>
          </div>

          {/* 4-Column Specifications Grid */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 py-3 border-y border-[#F0F0F0] text-xs text-[#555555]">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#888888] shrink-0" />
              <span className="font-mono-numbers truncate">
                {formatMileage(vehicle.mileageKm, currentCurrency)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Cog className="w-3.5 h-3.5 text-[#888888] shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-[#888888] shrink-0" />
              <span className="truncate">{vehicle.fuelType} · {vehicle.engineCapacityCc} cc</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0 bg-[#333333]" />
              <span className="truncate">{vehicle.exteriorColor}</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Price (Verified)</span>
              <span className="text-xl font-bold font-mono-numbers text-[#111111]">
                {formatPrice(vehicle.priceJPY, currentCurrency)}
              </span>
            </div>
            {currentCurrency !== 'JPY' && (
              <span className="text-[11px] text-[#777777] font-mono-numbers">
                (¥{vehicle.priceJPY.toLocaleString('ja-JP')})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: View Details & Enquire Now */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onViewDetails(vehicle)}
          className="w-full py-2.5 px-3 bg-[#F8F6F0] hover:bg-[#E8E8E8] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded border border-[#E0E0E0] transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onEnquire(vehicle)}
          className="w-full py-2.5 px-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
};
