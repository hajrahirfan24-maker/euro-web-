import React from 'react';
import { Phone, Mail, MapPin, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-[#222222]">
      {/* Upper Footer: Brand Lockup & Direct Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo.png"
                alt="EURO JAPAN IMPORTS Official Circular Logo"
                className="w-14 h-14 rounded-full border border-white/20 object-cover shadow"
              />
              <div>
                <span className="text-xl font-bold tracking-wider uppercase font-serif-brand text-white block">
                  EURO JAPAN IMPORTS
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888] font-medium block">
                  Automobile Sales & International Imports
                </span>
              </div>
            </div>

            <p className="text-xs text-[#999999] leading-relaxed max-w-sm">
              Specialized international motor vehicle dealership. Curating pristine Japanese domestic market automobiles, classic Nissan Figaro roadsters, BMW model families, and European sports marques.
            </p>

            <div className="pt-2 text-xs text-[#AAAAAA] space-y-1">
              <div>Principal Owner: <strong className="text-white">M. Subhan</strong></div>
              <div>Direct Line: <a href="tel:+819030372807" className="text-white font-mono-numbers hover:underline">+81 90-3037-2807</a></div>
            </div>
          </div>

          {/* Target Markets */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#888888] mb-4">
              Target Markets
            </h4>
            <ul className="space-y-2 text-xs text-[#CCCCCC]">
              <li>
                <span className="font-semibold text-white">Japan:</span> Osaka & Yokohama Export Logistics
              </li>
              <li>
                <span className="font-semibold text-white">Germany:</span> Bremerhaven Port & TÜV §21
              </li>
              <li>
                <span className="font-semibold text-white">United Kingdom:</span> Southampton Port & V5C
              </li>
              <li>
                <span className="font-semibold text-white">European Union:</span> Rotterdam, Antwerp & Continental Ro-Ro
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#888888] mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#CCCCCC]">
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-white transition-colors"
                >
                  Current Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('figaro')}
                  className="hover:text-white transition-colors"
                >
                  Nissan Figaro Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bmw')}
                  className="hover:text-white transition-colors"
                >
                  BMW All Model Families
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-white transition-colors"
                >
                  Import Workflow
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Dealership
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Telephone Action */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#888888] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+819030372807"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1C] hover:bg-white hover:text-[#111111] text-white border border-[#333333] rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+81 90-3037-2807</span>
              </a>

              <p className="text-[11px] text-[#777777] leading-relaxed">
                Click to call directly from your device. Available via WhatsApp & Voice.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-xs text-[#777777] hover:text-white transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer / Legal & Copyright */}
      <div className="border-t border-[#1F1F1F] bg-[#0A0A0A] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            © {new Date().getFullYear()} EURO JAPAN IMPORTS. All rights reserved. Principal: M. Subhan.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px]">Osaka · Yokohama · Bremerhaven · Southampton</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-[#1C1C1C] hover:bg-[#282828] text-white rounded transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
