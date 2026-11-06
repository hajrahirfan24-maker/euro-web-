/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandCategoryBar } from './components/BrandCategoryBar';
import { NissanFigaroSection } from './components/NissanFigaroSection';
import { BMWDirectorySection } from './components/BMWDirectorySection';
import { VehicleInventory } from './components/VehicleInventory';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ImportProcessSection } from './components/ImportProcessSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { StorageService } from './services/storage';
import { Vehicle, Currency, VehicleBrand } from './types/vehicle';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => StorageService.getCurrency());
  const [selectedBrand, setSelectedBrand] = useState<VehicleBrand | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    vehicle?: Vehicle | null;
    defaultModelName?: string;
  }>({ isOpen: false });
  const [adminDashboardOpen, setAdminDashboardOpen] = useState<boolean>(false);

  // Reload vehicles from storage when admin updates
  const refreshVehicles = () => {
    setVehicles(StorageService.getVehicles());
  };

  const handleCurrencyChange = (currency: Currency) => {
    setCurrentCurrency(currency);
    StorageService.setCurrency(currency);
  };

  // Brand vehicle counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    vehicles.forEach((v) => {
      counts[v.brand] = (counts[v.brand] || 0) + 1;
    });
    return counts;
  }, [vehicles]);

  // Featured Figaro vehicle
  const figaroVehicle = useMemo(() => {
    return vehicles.find((v) => v.isFigaroSpecial) || vehicles.find((v) => v.model.toLowerCase().includes('figaro'));
  }, [vehicles]);

  // In-stock BMW vehicles
  const inStockBMWVehicles = useMemo(() => {
    return vehicles.filter((v) => v.brand === 'BMW');
  }, [vehicles]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquire = (vehicle: Vehicle) => {
    setEnquiryModal({
      isOpen: true,
      vehicle,
      defaultModelName: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`
    });
  };

  const handleSourcingRequest = (modelName: string) => {
    setEnquiryModal({
      isOpen: true,
      vehicle: null,
      defaultModelName: modelName
    });
  };

  const handleFilterInventoryBMW = () => {
    setSelectedBrand('BMW');
    handleNavigate('inventory');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={handleCurrencyChange}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Japanese mountain / Fuji automotive visual */}
        <HeroSection
          onExploreClick={() => handleNavigate('inventory')}
          onContactClick={() => handleNavigate('contact')}
          onQuickSearch={(query) => {
            setSearchQuery(query);
            if (query) {
              handleNavigate('inventory');
            }
          }}
          searchQuery={searchQuery}
        />

        {/* 14 Brands Filter Bar */}
        <BrandCategoryBar
          selectedBrand={selectedBrand}
          onSelectBrand={(b) => {
            setSelectedBrand(b);
            handleNavigate('inventory');
          }}
          brandCounts={brandCounts}
        />

        {/* Vehicle Inventory & Listings Showroom */}
        <VehicleInventory
          vehicles={vehicles}
          currentCurrency={currentCurrency}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onViewDetails={(veh) => setSelectedVehicleForDetails(veh)}
          onEnquire={handleEnquire}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dedicated Nissan Figaro Section */}
        <NissanFigaroSection
          figaroVehicle={figaroVehicle}
          currentCurrency={currentCurrency}
          onEnquire={handleEnquire}
          onViewDetails={(veh) => setSelectedVehicleForDetails(veh)}
          onSourcingRequest={handleSourcingRequest}
        />

        {/* Dedicated BMW Collection — All 19 Model Families */}
        <BMWDirectorySection
          onSelectBMWFamily={(family) => {
            handleSourcingRequest(family.series);
          }}
          onFilterInventoryBMW={handleFilterInventoryBMW}
          onSourcingRequest={handleSourcingRequest}
          inStockBMWVehicles={inStockBMWVehicles}
        />

        {/* International Import Process (Yokohama/Kobe to Germany & UK) */}
        <ImportProcessSection />

        {/* About Dealership (M. Subhan & EURO JAPAN IMPORTS) */}
        <AboutUsSection />

        {/* Contact Dealership & Direct Click-to-Call with M. Subhan */}
        <ContactSection />
      </main>

      {/* Footer with official circular logo, credentials, and links */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      {/* Vehicle Detail Page Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicleForDetails}
        currentCurrency={currentCurrency}
        onClose={() => setSelectedVehicleForDetails(null)}
        onEnquire={(veh) => {
          setSelectedVehicleForDetails(null);
          handleEnquire(veh);
        }}
      />

      {/* Customer Enquiry Form Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        onClose={() => setEnquiryModal({ isOpen: false })}
        selectedVehicle={enquiryModal.vehicle}
        defaultModelName={enquiryModal.defaultModelName}
      />

      {/* Executive Admin Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        vehicles={vehicles}
        onVehiclesUpdated={refreshVehicles}
      />
    </div>
  );
}
