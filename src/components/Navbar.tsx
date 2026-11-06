import React, { useState } from 'react';
import { Phone, Shield, Menu, X, Globe, SlidersHorizontal } from 'lucide-react';
import { Currency } from '../types/vehicle';
import { CURRENCY_SYMBOLS } from '../services/storage';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenAdmin,
  onNavigate,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'figaro', label: 'Nissan Figaro' },
    { id: 'bmw', label: 'BMW Collection' },
    { id: 'process', label: 'Import Process' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111111] text-white border-b border-[#262626] backdrop-blur-md">
      {/* Top micro bar for international contact & credentials */}
      <div className="bg-black/60 border-b border-white/10 px-4 sm:px-8 py-1.5 text-xs text-[#A0A0A0] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Export Logistics: Osaka & Yokohama, Japan</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline">European Logistics: Bremerhaven (DE) & Southampton (UK)</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <a
            href="tel:+819030372807"
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors font-mono-numbers"
          >
            <Phone className="w-3 h-3 text-[#E8E8E8]" />
            <span>M. Subhan: +81 90-3037-2807</span>
          </a>
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-[#888888] hover:text-white transition-colors text-[11px] ml-2"
            title="Administrator Portal"
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand zone — Nav links — Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text & official circular logo lockup */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="flex items-center gap-3.5 whitespace-nowrap shrink-0 group"
        >
          <img
            src="/logo.png"
            alt="EURO JAPAN IMPORTS Official Circular Emblem"
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full border border-white/20 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-wider uppercase font-serif-brand text-white">
              EURO JAPAN IMPORTS
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] font-medium">
              Premium International Automobiles
            </span>
          </div>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C8C8C8]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                activeSection === link.id
                  ? 'text-white font-semibold'
                  : 'hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Currency selector & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Selector */}
          <div className="flex items-center bg-[#202020] border border-[#333333] rounded px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-[#888888] mr-1.5" />
            <select
              aria-label="Select currency"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-transparent text-white font-mono-numbers focus:outline-none cursor-pointer pr-1"
            >
              <option value="JPY" className="bg-[#111111] text-white">JPY (¥)</option>
              <option value="EUR" className="bg-[#111111] text-white">EUR (€)</option>
              <option value="GBP" className="bg-[#111111] text-white">GBP (£)</option>
              <option value="USD" className="bg-[#111111] text-white">USD ($)</option>
            </select>
          </div>

          {/* Primary CTA button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-white text-[#111111] rounded hover:bg-[#E8E8E8] transition-colors whitespace-nowrap shrink-0"
          >
            Direct Enquiry
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation slide-down drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181818] border-b border-[#303030] px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2 text-sm font-medium ${
                  activeSection === link.id ? 'text-white font-bold' : 'text-[#BBBBBB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#2A2A2A] flex flex-col gap-3">
            <a
              href="tel:+819030372807"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-[#111111] text-xs font-semibold uppercase tracking-wider rounded"
            >
              <Phone className="w-3.5 h-3.5" />
              Call M. Subhan (+81 90-3037-2807)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#252525] text-white text-xs rounded border border-[#3A3A3A]"
            >
              <Shield className="w-3.5 h-3.5" />
              Administrator Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
