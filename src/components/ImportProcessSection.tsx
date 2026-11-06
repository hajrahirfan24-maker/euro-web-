import React from 'react';
import { Search, FileCheck, Ship, ShieldCheck, ArrowRight } from 'lucide-react';

export const ImportProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Vehicle Sourcing & Inspection',
      subtitle: 'USS Osaka, Yokohama & Kansai Dealer Networks in Japan',
      desc: 'We inspect candidate vehicles at premier Japanese auction houses (USS Osaka, USS Yokohama, TAA Kinki) or dealer yards. Our bilingual inspectors verify the official Japanese auction grade (Grade 4.0, 4.5, or 5.0), verify genuine odometer readings via JEVIC, and inspect chassis strut towers for zero-rust integrity.',
      icon: Search
    },
    {
      num: '02',
      title: 'Deregistration & Japanese Export Title',
      subtitle: 'Official Land Transport Bureau (Matsudo) Clearance',
      desc: 'Upon purchase, the vehicle is de-registered with the Japanese Ministry of Land, Infrastructure, Transport and Tourism. An official Japanese Export Certificate (Yushutsu Massho) is issued along with a certified English translation for European customs authorities.',
      icon: FileCheck
    },
    {
      num: '03',
      title: 'Maritime Ro-Ro or Dedicated Container',
      subtitle: 'Osaka / Yokohama to Bremerhaven & Southampton',
      desc: 'Vehicles are loaded onto specialized Ro-Ro (Roll-on/Roll-off) vehicle carriers or secured in 20ft/40ft maritime shipping containers. Transit times average 35–45 days via direct ocean routes to Bremerhaven (Germany) or Southampton (United Kingdom). Marine insurance is provided.',
      icon: Ship
    },
    {
      num: '04',
      title: 'Customs Clearance & European Road Compliance',
      subtitle: 'German TÜV §21 Vollabnahme / UK V5C & IVA',
      desc: 'We assist client clearing agents at destination ports. For Germany, cars are prepared for TÜV Vollabnahme §21 (headlamp beam pattern, fog lamp wiring, exhaust emissions). For the UK, V5C registration and NOVA documentation are coordinated.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="process" className="py-20 bg-[#111111] text-white border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#888888] font-semibold mb-2">
            <span>Logistics & Compliance Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Japan to Europe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-brand tracking-tight text-white">
            The International Import Process
          </h2>
          <p className="mt-3 text-sm text-[#AAAAAA] leading-relaxed">
            A transparent 4-stage journey from Japanese auction inspection to European port arrival and registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#181818] border border-[#282828] p-6 rounded-lg flex flex-col justify-between hover:border-[#444444] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono-numbers text-white/30">{s.num}</span>
                    <div className="p-2.5 bg-[#222222] rounded text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 font-serif-brand">{s.title}</h3>
                  <div className="text-[11px] text-[#888888] font-medium mb-3">{s.subtitle}</div>
                  <p className="text-xs text-[#999999] leading-relaxed">{s.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#262626] flex items-center text-[11px] text-[#AAAAAA]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  <span>Fully Verified Stage</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
