import React from 'react';
import { ShieldCheck, Anchor, Globe2, Compass, Phone } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F8F6F0] text-[#111111] border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] font-semibold mb-2">
            <span>Corporate Dossier</span>
            <span aria-hidden="true">·</span>
            <span>Brand Identity & Mission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-brand tracking-tight text-[#111111]">
            About EURO JAPAN IMPORTS
          </h2>
          <p className="mt-3 text-sm text-[#555555] leading-relaxed">
            Automobile sales and international import dealership bridging Japanese domestic market rarities and European engineering.
          </p>
        </div>

        {/* Port Visual & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 bg-white p-2 rounded-xl border border-[#E0E0E0] shadow-sm">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black">
              <img
                src="/src/assets/images/yokohama_port_export_1793978773419.jpg"
                alt="Automobile export yard at Yokohama port with car carrier vessel"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 text-xs rounded">
                Yokohama Maritime Shipping Hub, Japan
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="border-l-2 border-[#111111] pl-4">
              <h3 className="text-xl font-bold font-serif-brand text-[#111111]">
                Specialized Automobile Sales & Direct Imports
              </h3>
              <p className="text-xs text-[#777777] mt-1 uppercase tracking-wider">
                Founder & Principal: M. Subhan
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              <strong>EURO JAPAN IMPORTS</strong> is an international automobile dealership operating between Japan, Germany, the United Kingdom, and the wider European continent. Founded and directed by <strong>M. Subhan</strong>, our enterprise is focused exclusively on motor vehicles—specializing in high-caliber Japanese domestic market (JDM) models, the cult-classic <strong>Nissan Figaro</strong>, the entire spectrum of <strong>BMW model families</strong>, and hand-selected European performance cars.
            </p>

            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              Unlike generic classifieds portals, we manage the physical purchase, inspection verification, Japanese export documentation, maritime vessel scheduling from Osaka and Yokohama ports, and customs preparation for delivery into European ports like Bremerhaven and Southampton.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded border border-[#E8E8E8]">
                <Globe2 className="w-5 h-5 text-[#111111] mb-2" />
                <div className="font-semibold text-xs text-[#111111]">Target Markets</div>
                <div className="text-[11px] text-[#666666] mt-0.5">Japan, Germany, United Kingdom, and European Union</div>
              </div>

              <div className="p-4 bg-white rounded border border-[#E8E8E8]">
                <Compass className="w-5 h-5 text-[#111111] mb-2" />
                <div className="font-semibold text-xs text-[#111111]">Verified Methodology</div>
                <div className="text-[11px] text-[#666666] mt-0.5">Physical inspection sheets, genuine odometer certification, zero-salt chassis checks</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the Dealership */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm">
            <span className="text-xs font-mono-numbers text-[#777777] block mb-2">01.</span>
            <h4 className="text-base font-bold text-[#111111] mb-2">Brand Identity</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              A distinctive trilateral bridge uniting British, German, and Japanese automotive cultures under our official circular emblem.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm">
            <span className="text-xs font-mono-numbers text-[#777777] block mb-2">02.</span>
            <h4 className="text-base font-bold text-[#111111] mb-2">Curated Collection</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              From pristine 1991 Nissan Figaro Pike convertibles to modern BMW M-Performance and air-cooled or modern German classics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm">
            <span className="text-xs font-mono-numbers text-[#777777] block mb-2">03.</span>
            <h4 className="text-base font-bold text-[#111111] mb-2">Enquiry Process</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              Direct, transparent consultation with owner M. Subhan. Every enquiry receives full auction sheets, chassis photos, and freight estimates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E8E8] shadow-sm">
            <span className="text-xs font-mono-numbers text-[#777777] block mb-2">04.</span>
            <h4 className="text-base font-bold text-[#111111] mb-2">Direct Contact</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              Reach M. Subhan directly via telephone at <strong>+81 90-3037-2807</strong> for immediate response regarding vehicle availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
