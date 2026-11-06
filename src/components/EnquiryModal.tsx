import React, { useState } from 'react';
import { Vehicle } from '../types/vehicle';
import { StorageService } from '../services/storage';
import { X, CheckCircle2, Phone, MessageSquare, Send, AlertCircle } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle?: Vehicle | null;
  defaultModelName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedVehicle,
  defaultModelName
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Germany');
  const [vehicleOfInterest, setVehicleOfInterest] = useState(
    selectedVehicle
      ? `${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.year}) [${selectedVehicle.stockNumber}]`
      : defaultModelName || ''
  );
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState(
    selectedVehicle
      ? `Hello M. Subhan, I am interested in ${selectedVehicle.brand} ${selectedVehicle.model} (Stock ${selectedVehicle.stockNumber}). Please provide shipping terms, container availability, and export documentation.`
      : ''
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone, and Message).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Real storage persistence
      StorageService.addEnquiry({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country,
        vehicleId: selectedVehicle?.id,
        vehicleTitle: vehicleOfInterest,
        message: message.trim(),
        preferredContact
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('Failed to record enquiry. Please contact M. Subhan directly by phone.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-[#111111] w-full max-w-xl rounded-xl shadow-2xl border border-[#D0D0D0] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#252525]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-white" />
            <h3 className="text-sm font-semibold uppercase tracking-wider font-serif-brand">
              Vehicle Enquiry & Direct Dealership Desk
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold font-serif-brand text-[#111111]">
                Enquiry Successfully Transmitted
              </h4>
              <p className="text-xs text-[#555555] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{customerName}</strong>. Your enquiry for <strong>{vehicleOfInterest}</strong> has been logged in our dealership system. M. Subhan will review your request and get in touch via {preferredContact}.
              </p>
              <div className="pt-4 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+819030372807"
                  className="px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase rounded hover:bg-black transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call M. Subhan Now (+81 90-3037-2807)</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#F8F6F0] text-[#111111] text-xs font-semibold uppercase rounded border border-[#CCCCCC] hover:bg-[#E8E8E8]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#F8F6F0] p-3 rounded border border-[#E8E8E8] text-xs text-[#666666] flex items-center justify-between">
                <span>Dealership Principal: <strong>M. Subhan</strong></span>
                <a
                  href="tel:+819030372807"
                  className="text-[#111111] font-semibold flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>+81 90-3037-2807</span>
                </a>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-800 text-xs rounded border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Vehicle Title */}
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Vehicle of Interest
                </label>
                <input
                  type="text"
                  value={vehicleOfInterest}
                  onChange={(e) => setVehicleOfInterest(e.target.value)}
                  placeholder="e.g. Nissan Figaro, BMW M3 Competition, Porsche 911"
                  className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Klaus Reinhardt / Oliver Smith"
                    className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
              </div>

              {/* Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 ... / +44 ... / +81 ..."
                    className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Target Destination Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="Germany">Germany (Bremerhaven Port)</option>
                    <option value="United Kingdom">United Kingdom (Southampton)</option>
                    <option value="Japan">Japan (Domestic Delivery)</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands (Rotterdam)</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Other Europe">Other European Country</option>
                    <option value="United States / Canada">United States / Canada</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Mode */}
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Preferred Contact Method
                </label>
                <div className="flex gap-2">
                  {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPreferredContact(method)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                        preferredContact === method
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#F8F6F0] text-[#555555] border-[#CCCCCC] hover:border-[#999999]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Enquiry Message & Shipping Inquiries *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about port delivery, auction sheet, underbody inspection, or customs registration..."
                  className="w-full bg-[#F8F6F0] border border-[#CCCCCC] rounded p-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#777777] hover:text-[#111111]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
