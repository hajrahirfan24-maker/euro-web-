import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Germany');
  const [vehicleOfInterest, setVehicleOfInterest] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      StorageService.addEnquiry({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country,
        vehicleTitle: vehicleOfInterest.trim() || 'General Automotive Consultation',
        message: message.trim(),
        preferredContact
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Failed to send enquiry. Please contact M. Subhan directly via telephone.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#111111] text-white border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#888888] font-semibold mb-2">
            <span>Direct Client Services</span>
            <span aria-hidden="true">·</span>
            <span>Japan · Germany · UK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-brand tracking-tight text-white">
            Connect With Our Dealership
          </h2>
          <p className="mt-3 text-sm text-[#AAAAAA] leading-relaxed">
            Directly communicate with EURO JAPAN IMPORTS principal M. Subhan for custom vehicle sourcing, auction bidding, shipping schedules, and import compliance documentation.
          </p>
        </div>

        {/* Contact Grid: Business Details & Working Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Business Info Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Owner Contact Card */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-lg border border-[#2A2A2A] space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="EURO JAPAN IMPORTS Emblem"
                  className="w-14 h-14 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-serif-brand">EURO JAPAN IMPORTS</h3>
                  <div className="text-xs text-[#888888]">Automobile Sales & International Imports</div>
                  <div className="text-xs text-white font-medium mt-0.5">Principal: M. Subhan</div>
                </div>
              </div>

              {/* Direct Telephone Button (MANDATORY CLICK-TO-CALL) */}
              <div className="pt-4 border-t border-[#262626]">
                <span className="text-[10px] uppercase tracking-wider text-[#777777] block mb-2 font-medium">
                  Direct Telephone & WhatsApp
                </span>
                <a
                  href="tel:+819030372807"
                  className="flex items-center justify-between p-4 bg-white text-[#111111] hover:bg-[#F8F6F0] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#111111] shrink-0" />
                    <div>
                      <div className="text-sm font-bold font-mono-numbers">+81 90-3037-2807</div>
                      <div className="text-[10px] text-[#555555]">Click to Call M. Subhan (Japan)</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Call Now
                  </span>
                </a>
              </div>

              {/* Target Markets Info */}
              <div className="pt-4 border-t border-[#262626] space-y-3 text-xs text-[#CCCCCC]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Operational Ports & Hubs</span>
                    <span className="text-[#999999]">Osaka Nanko & Yokohama Port Hubs (Japan) · Bremerhaven (Germany) · Southampton (UK)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Operating Timezones</span>
                    <span className="text-[#999999]">Japan Standard Time (JST) & Central European Time (CET)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Direct Export Assurance</span>
                    <span className="text-[#999999]">Original Japanese deregistration title (Matsudo), English certified translation, and bill of lading provided.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-7 bg-[#181818] p-6 sm:p-8 rounded-lg border border-[#2A2A2A]">
            <h3 className="text-xl font-bold font-serif-brand text-white mb-2">
              Customer Enquiry Form
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              Inquire about current vehicles, custom auction bidding, or door-to-port maritime shipping.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h4 className="text-2xl font-bold font-serif-brand text-white">
                  Enquiry Received
                </h4>
                <p className="text-xs sm:text-sm text-[#CCCCCC] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{customerName}</strong>. Your enquiry has been registered in the EURO JAPAN IMPORTS system. M. Subhan will review your vehicle request and respond via {preferredContact}.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCustomerName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-white text-[#111111] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#E8E8E8]"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-950/80 border border-red-700 text-red-200 text-xs rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Klaus Reinhardt"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. klaus@domain.de"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +49 89 2314 980"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                      Target Country *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer"
                    >
                      <option value="Germany">Germany (Bremerhaven Port)</option>
                      <option value="United Kingdom">United Kingdom (Southampton Port)</option>
                      <option value="Japan">Japan (Domestic Delivery)</option>
                      <option value="Netherlands">Netherlands (Rotterdam Port)</option>
                      <option value="France">France</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Other European Country">Other European Country</option>
                      <option value="International">Other International Destination</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                    Vehicle of Interest
                  </label>
                  <input
                    type="text"
                    value={vehicleOfInterest}
                    onChange={(e) => setVehicleOfInterest(e.target.value)}
                    placeholder="e.g. Nissan Figaro 1991, BMW M3 Competition, Porsche 911 (992)..."
                    className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                    Preferred Response Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['WhatsApp', 'Phone', 'Email'] as const).map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setPreferredContact(m)}
                        className={`py-2 text-xs font-medium rounded border transition-colors ${
                          preferredContact === m
                            ? 'bg-white text-[#111111] border-white font-semibold'
                            : 'bg-[#222222] text-[#888888] border-[#333333] hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#AAAAAA] mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the vehicle you are seeking, preferred condition grade, delivery port, or timeline..."
                    className="w-full bg-[#222222] border border-[#333333] rounded p-2.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-white text-[#111111] hover:bg-[#E8E8E8] text-xs font-semibold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Send Enquiry to M. Subhan'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
