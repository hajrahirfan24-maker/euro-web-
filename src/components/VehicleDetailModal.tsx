import React, { useState } from 'react';
import { Vehicle, Currency } from '../types/vehicle';
import { formatMileage, formatPrice } from '../services/storage';
import {
  X,
  Phone,
  ShieldCheck,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  FileText,
  Share2,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  MessageSquare
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  currentCurrency: Currency;
  onClose: () => void;
  onEnquire: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  currentCurrency,
  onClose,
  onEnquire
}) => {
  if (!vehicle) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : ['/src/assets/images/hero_japanese_automotive_1793978771369.jpg'];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-[#111111] w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-[#D0D0D0] my-8 relative flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#252525] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-numbers px-2 py-0.5 bg-[#252525] text-[#AAAAAA] rounded border border-[#333333]">
              {vehicle.stockNumber}
            </span>
            <span className="text-xs text-[#888888] hidden sm:inline">|</span>
            <span className="text-sm font-semibold tracking-wider uppercase text-white truncate max-w-md">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+819030372807"
              className="hidden sm:flex items-center gap-1.5 text-xs text-white/90 hover:text-white px-2.5 py-1 bg-[#222222] rounded border border-[#333333]"
            >
              <Phone className="w-3 h-3" />
              <span>+81 90-3037-2807</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white rounded hover:bg-[#252525] transition-colors"
              aria-label="Close vehicle modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          {/* Main Hero & Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main Image Frame with Zoom */}
              <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden border border-[#E8E8E8] group">
                <img
                  src={images[activeImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model} - view ${activeImageIndex + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  referrerPolicy="no-referrer"
                />

                {/* Left / Right Nav Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter & Zoom Toggle */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono-numbers bg-black/70 text-white px-2.5 py-1 rounded backdrop-blur-sm">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-1.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-sm"
                    title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Condition Grade Pill */}
                <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{vehicle.conditionGrade}</span>
                </div>
              </div>

              {/* Thumbnails strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative w-20 h-14 rounded overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#111111] shadow'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Purchase Module (PDP Contiguous Module) */}
            <div className="lg:col-span-5 bg-[#F8F6F0] p-6 rounded-lg border border-[#E8E8E8] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#777777] font-semibold">
                    {vehicle.brand}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {vehicle.availability}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold font-serif-brand text-[#111111] leading-tight">
                  {vehicle.model}
                </h1>
                {vehicle.subModel && (
                  <p className="text-xs text-[#555555] mt-1">{vehicle.subModel}</p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-[#666666] mt-3">
                  <MapPin className="w-3.5 h-3.5 text-[#777777]" />
                  <span>{vehicle.location}</span>
                </div>

                {/* Price Display */}
                <div className="mt-6 pt-4 border-t border-[#E8E8E8]">
                  <span className="text-xs text-[#777777] uppercase tracking-wider block">
                    Verified Dealership Price
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-bold font-mono-numbers text-[#111111]">
                      {formatPrice(vehicle.priceJPY, currentCurrency)}
                    </span>
                    {currentCurrency !== 'JPY' && (
                      <span className="text-xs text-[#777777] font-mono-numbers">
                        (¥{vehicle.priceJPY.toLocaleString('ja-JP')} JPY)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#777777] mt-1">
                    * FOB Yokohama / Port Staging. Includes Japan De-registration & Export Certificate.
                  </p>
                </div>

                {/* 4 Core Vital Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-6 text-xs">
                  <div className="bg-white p-3 rounded border border-[#E0E0E0]">
                    <span className="text-[#888888] block text-[11px]">Mileage</span>
                    <span className="font-semibold font-mono-numbers text-[#111111]">
                      {formatMileage(vehicle.mileageKm, currentCurrency)}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded border border-[#E0E0E0]">
                    <span className="text-[#888888] block text-[11px]">Manufacturing Year</span>
                    <span className="font-semibold font-mono-numbers text-[#111111]">{vehicle.year}</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-[#E0E0E0]">
                    <span className="text-[#888888] block text-[11px]">Transmission</span>
                    <span className="font-semibold text-[#111111]">{vehicle.transmission}</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-[#E0E0E0]">
                    <span className="text-[#888888] block text-[11px]">Chassis / VIN</span>
                    <span className="font-semibold font-mono-numbers text-[#111111] text-[11px] truncate block">
                      {vehicle.chassisVin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-[#E8E8E8]">
                <button
                  onClick={() => onEnquire(vehicle)}
                  className="w-full py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on This Exact Vehicle</span>
                </button>

                <a
                  href="tel:+819030372807"
                  className="w-full py-3 bg-white hover:bg-[#E8E8E8] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded border border-[#CCCCCC] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call M. Subhan (+81 90-3037-2807)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Vehicle Description Prose */}
          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8]">
            <h3 className="text-lg font-bold text-[#111111] font-serif-brand mb-3">
              Vehicle Overview & Condition Report
            </h3>
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8]">
            <h3 className="text-lg font-bold text-[#111111] font-serif-brand mb-4">
              Verified Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Manufacturer</span>
                <span className="font-semibold text-[#111111]">{vehicle.brand}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Model</span>
                <span className="font-semibold text-[#111111]">{vehicle.model}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Year of Manufacture</span>
                <span className="font-semibold font-mono-numbers text-[#111111]">{vehicle.year}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Engine Code & Configuration</span>
                <span className="font-semibold text-[#111111]">{vehicle.engineCode || 'Internal Combustion'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Engine Displacement</span>
                <span className="font-semibold font-mono-numbers text-[#111111]">{vehicle.engineCapacityCc} cc</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Transmission</span>
                <span className="font-semibold text-[#111111]">{vehicle.transmission}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Drivetrain</span>
                <span className="font-semibold text-[#111111]">{vehicle.driveTrain}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Fuel Type</span>
                <span className="font-semibold text-[#111111]">{vehicle.fuelType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Exterior Colour</span>
                <span className="font-semibold text-[#111111]">{vehicle.exteriorColor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Interior Upholstery</span>
                <span className="font-semibold text-[#111111]">{vehicle.interiorColor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Chassis / VIN Number</span>
                <span className="font-semibold font-mono-numbers text-[#111111]">{vehicle.chassisVin}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                <span className="text-[#777777]">Stock Number</span>
                <span className="font-semibold font-mono-numbers text-[#111111]">{vehicle.stockNumber}</span>
              </div>

              {/* Extra specifications from vehicle data */}
              {Object.entries(vehicle.specifications || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-[#F0F0F0]">
                  <span className="text-[#777777]">{key}</span>
                  <span className="font-semibold text-[#111111] font-mono-numbers text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export & International Compliance Status */}
          <div className="bg-[#F8F6F0] p-6 rounded-lg border border-[#E8E8E8]">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#111111]" />
              <span>International Documentation & Compliance Readiness</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded border border-[#E0E0E0] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Export Certificate Ready</span>
              </div>
              <div className="bg-white p-3 rounded border border-[#E0E0E0] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">JEVIC Mileage Verified</span>
              </div>
              <div className="bg-white p-3 rounded border border-[#E0E0E0] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">German TÜV §21 Papers Prepared</span>
              </div>
              <div className="bg-white p-3 rounded border border-[#E0E0E0] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">UK V5C & IVA Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
