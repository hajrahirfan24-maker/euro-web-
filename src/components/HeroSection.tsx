import React from 'react';
import { ChevronRight, ArrowDown, Search, ShieldCheck, Ship, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onQuickSearch: (query: string) => void;
  searchQuery: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
  onQuickSearch,
  searchQuery
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-black text-white overflow-hidden">
      {/* Background Japanese Automotive Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_japanese_automotive_1793978771369.jpg"
          alt="Lexus coupe overlooking Mount Fuji on a Japanese mountain highway at twilight"
          className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured contrast scrim gradient (black/80 at edges, clear view of Mt Fuji & car) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10 pt-16 md:pt-24 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        {/* Editorial Subtitle Kicker with typographic separator */}
        <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.25em] text-[#E0E0E0] mb-4">
          <span className="font-semibold text-white">Osaka & Yokohama</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Bremerhaven & Southampton</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Certified Export Quality</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-serif-brand max-w-3xl leading-[1.1] text-white">
          EURO JAPAN IMPORTS
        </h1>

        {/* Subtitle */}
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-[#F8F6F0] tracking-wide max-w-2xl">
          Discover Premium Japanese & European Cars.
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 text-sm sm:text-base text-[#D0D0D0] max-w-xl leading-relaxed">
          Explore exceptional vehicles, discover your next car, and connect with our dealership. Direct access to Japanese auctions, verified auction sheet grading, and door-to-port maritime shipping across Europe and the UK.
        </p>

        {/* Primary Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 bg-white text-[#111111] hover:bg-[#F8F6F0] text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 rounded"
          >
            <span>Explore Cars</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors rounded backdrop-blur-sm"
          >
            Contact Us
          </button>
        </div>

        {/* Fast Search Input Bar */}
        <div className="mt-10 max-w-xl bg-black/60 backdrop-blur-md border border-white/20 p-2 rounded flex items-center gap-2 shadow-2xl">
          <Search className="w-5 h-5 text-[#999999] ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search classic sports, Fairlady 240Z, Hakosuka, NSX, Figaro, BMW M3..."
            value={searchQuery}
            onChange={(e) => onQuickSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-white/50 focus:outline-none py-1.5"
          />
          {searchQuery && (
            <button
              onClick={() => onQuickSearch('')}
              className="text-xs text-white/60 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onExploreClick}
            className="px-4 py-2 bg-white text-[#111111] text-xs font-semibold uppercase rounded hover:bg-[#E8E8E8] transition-colors whitespace-nowrap shrink-0"
          >
            Find
          </button>
        </div>
      </div>

      {/* Bottom KPI & Trust Markers Bar */}
      <div className="relative z-10 border-t border-white/15 bg-black/80 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#E0E0E0] shrink-0" />
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-white">Verified Inspection</div>
              <div className="text-[11px] text-[#A0A0A0]">JEVIC & USS auction grade certified</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Ship className="w-6 h-6 text-[#E0E0E0] shrink-0" />
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-white">Direct Shipping</div>
              <div className="text-[11px] text-[#A0A0A0]">Yokohama/Kobe to DE & UK ports</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#E0E0E0] shrink-0" />
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-white">European Compliance</div>
              <div className="text-[11px] text-[#A0A0A0]">German TÜV & UK V5C guidance</div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 text-xs font-medium text-[#C0C0C0] hover:text-white transition-colors"
            >
              <span>Scroll to Showroom</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
