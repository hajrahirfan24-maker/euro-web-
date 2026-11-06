import React, { useState, useMemo } from 'react';
import { Vehicle, Currency, VehicleBrand, AvailabilityStatus } from '../types/vehicle';
import { VehicleCard } from './VehicleCard';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, LayoutGrid, List, Sparkles } from 'lucide-react';
import { formatPrice } from '../services/storage';

interface VehicleInventoryProps {
  vehicles: Vehicle[];
  currentCurrency: Currency;
  selectedBrand: VehicleBrand | 'All';
  onSelectBrand: (brand: VehicleBrand | 'All') => void;
  onViewDetails: (vehicle: Vehicle) => void;
  onEnquire: (vehicle: Vehicle) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const VehicleInventory: React.FC<VehicleInventoryProps> = ({
  vehicles,
  currentCurrency,
  selectedBrand,
  onSelectBrand,
  onViewDetails,
  onEnquire,
  searchQuery,
  onSearchChange
}) => {
  // Advanced Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [fuelFilter, setFuelFilter] = useState<string>('All');
  const [transFilter, setTransFilter] = useState<string>('All');
  const [availFilter, setAvailFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [maxMileage, setMaxMileage] = useState<number>(200000);
  const [minYear, setMinYear] = useState<number>(1985);
  const [maxYear, setMaxYear] = useState<number>(2026);
  const [maxPriceJPY, setMaxPriceJPY] = useState<number>(30000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Brand filter
      if (selectedBrand !== 'All' && v.brand !== selectedBrand) return false;

      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.model.toLowerCase().includes(q);
        const matchesBrand = v.brand.toLowerCase().includes(q);
        const matchesStock = v.stockNumber.toLowerCase().includes(q);
        const matchesChassis = v.chassisVin.toLowerCase().includes(q);
        const matchesEngine = (v.engineCode || '').toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesStock && !matchesChassis && !matchesEngine) {
          return false;
        }
      }

      // Fuel
      if (fuelFilter !== 'All' && v.fuelType !== fuelFilter) return false;

      // Transmission
      if (transFilter !== 'All' && v.transmission !== transFilter) return false;

      // Availability
      if (availFilter !== 'All' && v.availability !== availFilter) return false;

      // Location
      if (locationFilter !== 'All' && !v.location.includes(locationFilter)) return false;

      // Mileage
      if (v.mileageKm > maxMileage) return false;

      // Year
      if (v.year < minYear || v.year > maxYear) return false;

      // Price JPY
      if (v.priceJPY > maxPriceJPY) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceJPY - b.priceJPY;
      if (sortBy === 'price-desc') return b.priceJPY - a.priceJPY;
      if (sortBy === 'mileage-asc') return a.mileageKm - b.mileageKm;
      if (sortBy === 'year-desc') return b.year - a.year;
      // Default: newest dateAdded
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [
    vehicles,
    selectedBrand,
    searchQuery,
    fuelFilter,
    transFilter,
    availFilter,
    locationFilter,
    maxMileage,
    minYear,
    maxYear,
    maxPriceJPY,
    sortBy
  ]);

  const handleResetFilters = () => {
    onSelectBrand('All');
    onSearchChange('');
    setFuelFilter('All');
    setTransFilter('All');
    setAvailFilter('All');
    setLocationFilter('All');
    setMaxMileage(200000);
    setMinYear(1985);
    setMaxYear(2026);
    setMaxPriceJPY(30000000);
    setSortBy('newest');
  };

  const hasActiveFilters =
    selectedBrand !== 'All' ||
    searchQuery !== '' ||
    fuelFilter !== 'All' ||
    transFilter !== 'All' ||
    availFilter !== 'All' ||
    locationFilter !== 'All' ||
    maxMileage < 200000 ||
    minYear > 1985 ||
    maxYear < 2026 ||
    maxPriceJPY < 30000000;

  return (
    <section id="inventory" className="py-16 bg-[#F8F6F0] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] font-semibold mb-2">
              <span>Verified Dealership Stock</span>
              <span aria-hidden="true">·</span>
              <span>Direct Export</span>
              <span aria-hidden="true">·</span>
              <span>International Delivery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-brand tracking-tight text-[#111111]">
              Vehicle Showroom & Listings
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#666666] font-mono-numbers">
              Showing <strong>{filteredVehicles.length}</strong> of {vehicles.length} cars
            </span>
            <div className="h-4 w-[1px] bg-[#D0D0D0]" />
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-[#D0D0D0] rounded p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#E8E8E8] shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Main Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search manufacturer, model, engine code, or chassis VIN..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded pl-9 pr-3 py-2 text-xs text-[#111111] placeholder-[#777777] focus:outline-none focus:border-[#111111]"
              />
            </div>

            {/* Quick Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                aria-label="Sort vehicles by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="newest">Sort: Newest Listings</option>
                <option value="price-asc">Sort: Lowest Price</option>
                <option value="price-desc">Sort: Highest Price</option>
                <option value="mileage-asc">Sort: Lowest Mileage</option>
                <option value="year-desc">Sort: Year (Newest First)</option>
              </select>
            </div>

            {/* Filter Toggle & Reset Buttons */}
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded border transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-[#F8F6F0] text-[#111111] border-[#E0E0E0] hover:bg-[#E8E8E8]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="p-2 text-[#777777] hover:text-[#111111] border border-[#E0E0E0] rounded bg-[#F8F6F0] hover:bg-[#E8E8E8]"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Advanced Filters Drawer */}
          {showFilters && (
            <div className="mt-5 pt-5 border-t border-[#F0F0F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Fuel Type */}
              <div>
                <label className="block text-[#777777] mb-1 font-medium">Fuel Type</label>
                <select
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded p-2 text-xs text-[#111111]"
                >
                  <option value="All">All Fuel Types</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-[#777777] mb-1 font-medium">Transmission</label>
                <select
                  value={transFilter}
                  onChange={(e) => setTransFilter(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded p-2 text-xs text-[#111111]"
                >
                  <option value="All">All Transmissions</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Dual-Clutch / DCT">Dual-Clutch / DCT</option>
                </select>
              </div>

              {/* Availability Status */}
              <div>
                <label className="block text-[#777777] mb-1 font-medium">Availability Status</label>
                <select
                  value={availFilter}
                  onChange={(e) => setAvailFilter(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded p-2 text-xs text-[#111111]"
                >
                  <option value="All">All Availabilities</option>
                  <option value="Available">Available (In Stock)</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              {/* Location / Port Hub */}
              <div>
                <label className="block text-[#777777] mb-1 font-medium">Vehicle Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#E0E0E0] rounded p-2 text-xs text-[#111111]"
                >
                  <option value="All">All Locations</option>
                  <option value="Osaka">Osaka (Yard & Nanko Port, Japan)</option>
                  <option value="Yokohama">Yokohama (Port Hub & Daikoku, Japan)</option>
                  <option value="Bremerhaven">Bremerhaven Depot, Germany</option>
                  <option value="Southampton">Southampton Hub, UK</option>
                </select>
              </div>

              {/* Max Mileage Slider */}
              <div>
                <div className="flex justify-between text-[#777777] mb-1">
                  <span className="font-medium">Max Mileage</span>
                  <span className="font-mono-numbers text-[#111111]">
                    {maxMileage >= 200000 ? 'Any' : `${maxMileage.toLocaleString()} km`}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(Number(e.target.value))}
                  className="w-full accent-[#111111]"
                />
              </div>

              {/* Model Year Range */}
              <div>
                <div className="flex justify-between text-[#777777] mb-1">
                  <span className="font-medium">Model Year Range</span>
                  <span className="font-mono-numbers text-[#111111]">{minYear} – {maxYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1970"
                    max="2026"
                    value={minYear}
                    onChange={(e) => setMinYear(Number(e.target.value))}
                    className="w-1/2 bg-[#F8F6F0] border border-[#E0E0E0] rounded p-1.5 text-xs text-[#111111]"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="1970"
                    max="2026"
                    value={maxYear}
                    onChange={(e) => setMaxYear(Number(e.target.value))}
                    className="w-1/2 bg-[#F8F6F0] border border-[#E0E0E0] rounded p-1.5 text-xs text-[#111111]"
                  />
                </div>
              </div>

              {/* Max Price JPY Slider */}
              <div className="sm:col-span-2">
                <div className="flex justify-between text-[#777777] mb-1">
                  <span className="font-medium">Maximum Price Ceiling</span>
                  <span className="font-mono-numbers font-semibold text-[#111111]">
                    {maxPriceJPY >= 30000000 ? 'No Limit' : formatPrice(maxPriceJPY, currentCurrency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="30000000"
                  step="500000"
                  value={maxPriceJPY}
                  onChange={(e) => setMaxPriceJPY(Number(e.target.value))}
                  className="w-full accent-[#111111]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Results Grid / List */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#E8E8E8] p-12 text-center max-w-xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-serif-brand">
              No Vehicles Match Current Filters
            </h3>
            <p className="text-xs text-[#666666] mb-6 leading-relaxed">
              We did not find any inventory matching your specific criteria. We provide bespoke vehicle sourcing across Japanese auctions (USS, TAA, CAA) and German dealer networks.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-black transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                currentCurrency={currentCurrency}
                onViewDetails={onViewDetails}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          /* List View Mode */
          <div className="space-y-4">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white border border-[#E8E8E8] rounded-lg p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5 hover:border-[#111111] transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <div
                    className="w-full sm:w-44 h-28 bg-black rounded overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => onViewDetails(vehicle)}
                  >
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#777777]">
                      <span className="font-semibold uppercase text-[#111111]">{vehicle.brand}</span>
                      <span>·</span>
                      <span className="font-mono-numbers">{vehicle.year}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">{vehicle.conditionGrade}</span>
                    </div>
                    <h4
                      onClick={() => onViewDetails(vehicle)}
                      className="text-base font-bold text-[#111111] hover:underline cursor-pointer"
                    >
                      {vehicle.model}
                    </h4>
                    <div className="text-xs text-[#666666] mt-1">
                      {vehicle.location} · {vehicle.transmission} · {vehicle.fuelType} · {vehicle.mileageKm.toLocaleString()} km
                    </div>
                    <div className="text-[11px] font-mono-numbers text-[#888888] mt-0.5">
                      Chassis: {vehicle.chassisVin}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0F0F0]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Verified Price</span>
                    <span className="text-lg font-bold font-mono-numbers text-[#111111]">
                      {formatPrice(vehicle.priceJPY, currentCurrency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(vehicle)}
                      className="px-3 py-1.5 bg-[#F8F6F0] hover:bg-[#E8E8E8] text-[#111111] text-xs font-medium rounded border border-[#E0E0E0]"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onEnquire(vehicle)}
                      className="px-4 py-1.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase rounded tracking-wider"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
