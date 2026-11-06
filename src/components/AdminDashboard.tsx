import React, { useState } from 'react';
import { Vehicle, CustomerEnquiry, VehicleBrand, AvailabilityStatus } from '../types/vehicle';
import { StorageService } from '../services/storage';
import {
  Shield,
  X,
  Plus,
  Edit,
  Trash2,
  Lock,
  CheckCircle,
  Clock,
  Car,
  MessageSquare,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Search,
  Star,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onVehiclesUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  vehicles,
  onVehiclesUpdated
}) => {
  if (!isOpen) return null;

  // Security Gate: Password is subhan2026 or 1234
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'inventory' | 'enquiries' | 'settings'>('inventory');

  // Enquiries list
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(StorageService.getEnquiries());

  // Edit / Add Vehicle Modal state
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Form states for vehicle add/edit
  const [formBrand, setFormBrand] = useState<VehicleBrand>('Nissan');
  const [formModel, setFormModel] = useState('');
  const [formSubModel, setFormSubModel] = useState('');
  const [formYear, setFormYear] = useState<number>(2023);
  const [formStockNumber, setFormStockNumber] = useState('');
  const [formPriceJPY, setFormPriceJPY] = useState<number>(3500000);
  const [formMileageKm, setFormMileageKm] = useState<number>(45000);
  const [formFuelType, setFormFuelType] = useState<Vehicle['fuelType']>('Petrol');
  const [formTransmission, setFormTransmission] = useState<Vehicle['transmission']>('Automatic');
  const [formEngineCapacity, setFormEngineCapacity] = useState<number>(1998);
  const [formEngineCode, setFormEngineCode] = useState('');
  const [formDriveTrain, setFormDriveTrain] = useState<Vehicle['driveTrain']>('RWD');
  const [formExteriorColor, setFormExteriorColor] = useState('Pearl White');
  const [formInteriorColor, setFormInteriorColor] = useState('Black Leather');
  const [formConditionGrade, setFormConditionGrade] = useState('Grade 4.5 / A');
  const [formChassisVin, setFormChassisVin] = useState('');
  const [formLocation, setFormLocation] = useState('Yokohama Port Hub, Japan');
  const [formAvailability, setFormAvailability] = useState<AvailabilityStatus>('Available');
  const [formIsFeatured, setFormIsFeatured] = useState<boolean>(false);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode.trim() === 'subhan2026' || authCode.trim() === '1234' || authCode.trim() === 'subhan') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid security access code. Try "subhan2026" or "1234".');
    }
  };

  const openAddVehicleModal = () => {
    setIsAddingNew(true);
    setEditingVehicle(null);
    setFormBrand('Nissan');
    setFormModel('');
    setFormSubModel('');
    setFormYear(2023);
    setFormStockNumber(`EJI-CAR-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormPriceJPY(4500000);
    setFormMileageKm(30000);
    setFormFuelType('Petrol');
    setFormTransmission('Automatic');
    setFormEngineCapacity(2000);
    setFormEngineCode('');
    setFormDriveTrain('RWD');
    setFormExteriorColor('Metallic Black');
    setFormInteriorColor('Black Leather');
    setFormConditionGrade('Grade 4.5 / A');
    setFormChassisVin(`VIN-JP-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormLocation('Yokohama Port Hub, Japan');
    setFormAvailability('Available');
    setFormIsFeatured(false);
    setFormImageUrl('/src/assets/images/hero_japanese_automotive_1793978771369.jpg');
    setFormDescription('Fully inspected vehicle with Japanese deregistration export certificate and genuine verified odometer.');
  };

  const openEditVehicleModal = (veh: Vehicle) => {
    setEditingVehicle(veh);
    setIsAddingNew(false);
    setFormBrand(veh.brand);
    setFormModel(veh.model);
    setFormSubModel(veh.subModel || '');
    setFormYear(veh.year);
    setFormStockNumber(veh.stockNumber);
    setFormPriceJPY(veh.priceJPY);
    setFormMileageKm(veh.mileageKm);
    setFormFuelType(veh.fuelType);
    setFormTransmission(veh.transmission);
    setFormEngineCapacity(veh.engineCapacityCc);
    setFormEngineCode(veh.engineCode || '');
    setFormDriveTrain(veh.driveTrain);
    setFormExteriorColor(veh.exteriorColor);
    setFormInteriorColor(veh.interiorColor);
    setFormConditionGrade(veh.conditionGrade);
    setFormChassisVin(veh.chassisVin);
    setFormLocation(veh.location);
    setFormAvailability(veh.availability);
    setFormIsFeatured(!!veh.isFeatured);
    setFormImageUrl(veh.images[0] || '');
    setFormDescription(veh.description);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    const priceJPY = Number(formPriceJPY);
    const vehicleData: Vehicle = {
      id: editingVehicle ? editingVehicle.id : `eji-${Date.now()}`,
      stockNumber: formStockNumber.trim() || `EJI-${Date.now().toString().slice(-4)}`,
      brand: formBrand,
      model: formModel.trim(),
      subModel: formSubModel.trim(),
      year: Number(formYear),
      priceJPY,
      priceEUR: Math.round(priceJPY * 0.00613),
      priceGBP: Math.round(priceJPY * 0.00521),
      priceUSD: Math.round(priceJPY * 0.00658),
      mileageKm: Number(formMileageKm),
      fuelType: formFuelType,
      transmission: formTransmission,
      engineCapacityCc: Number(formEngineCapacity),
      engineCode: formEngineCode.trim(),
      powerHp: editingVehicle?.powerHp || 300,
      driveTrain: formDriveTrain,
      exteriorColor: formExteriorColor.trim(),
      interiorColor: formInteriorColor.trim(),
      conditionGrade: formConditionGrade.trim(),
      chassisVin: formChassisVin.trim(),
      location: formLocation.trim(),
      availability: formAvailability,
      isFeatured: formIsFeatured,
      isFigaroSpecial: formModel.toLowerCase().includes('figaro'),
      images: [formImageUrl.trim() || '/src/assets/images/hero_japanese_automotive_1793978771369.jpg'],
      description: formDescription.trim(),
      specifications: editingVehicle?.specifications || {
        'Engine': `${formEngineCapacity} cc`,
        'Transmission': formTransmission,
        'Drivetrain': formDriveTrain
      },
      documentation: editingVehicle?.documentation || {
        exportCertificate: true,
        auctionSheetAvailable: true,
        mileageVerified: true
      },
      dateAdded: editingVehicle ? editingVehicle.dateAdded : new Date().toISOString().split('T')[0]
    };

    StorageService.saveVehicle(vehicleData);
    setEditingVehicle(null);
    setIsAddingNew(false);
    onVehiclesUpdated();
  };

  const handleDeleteVehicle = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      StorageService.deleteVehicle(id);
      onVehiclesUpdated();
    }
  };

  const handleUpdateEnquiryStatus = (id: string, status: CustomerEnquiry['status']) => {
    StorageService.updateEnquiryStatus(id, status);
    setEnquiries(StorageService.getEnquiries());
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm('Delete this customer enquiry record?')) {
      StorageService.deleteEnquiry(id);
      setEnquiries(StorageService.getEnquiries());
    }
  };

  const handleResetData = () => {
    if (confirm('Reset vehicle inventory and sample inquiries to default initial state?')) {
      StorageService.resetToDefault();
      setEnquiries(StorageService.getEnquiries());
      onVehiclesUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#141414] text-white w-full max-w-6xl rounded-xl shadow-2xl border border-[#2D2D2D] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Navbar */}
        <div className="bg-black px-6 py-4 flex items-center justify-between border-b border-[#282828] shrink-0">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-sm font-bold font-serif-brand uppercase tracking-wider text-white">
                EURO JAPAN IMPORTS — Executive Dealership Console
              </h2>
              <div className="text-[11px] text-[#888888]">
                Owner Principal: <strong>M. Subhan</strong> · Secure Management System
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded hover:bg-[#222222]"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-16 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-[#202020] border border-[#333333] rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif-brand text-white">
                Owner Authentication
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Enter your administrative security code to access dealership inventory, price controls, and customer enquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Access Code (e.g. subhan2026 or 1234)"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="w-full bg-[#1C1C1C] border border-[#333333] rounded p-3 text-xs text-white text-center tracking-widest placeholder-[#666666] focus:outline-none focus:border-white"
                autoFocus
              />

              {authError && (
                <div className="text-xs text-red-400 bg-red-950/60 p-2.5 rounded border border-red-800 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-[#111111] hover:bg-[#E8E8E8] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Unlock Administrator Dashboard
              </button>

              <div className="text-[11px] text-[#666666]">
                Default owner PIN for testing: <code className="text-white">subhan2026</code> or <code className="text-white">1234</code>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Statistics Bar */}
            <div className="bg-[#1C1C1C] border-b border-[#282828] p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#141414] p-3 rounded border border-[#282828]">
                <span className="text-[#888888] block text-[11px]">Total Vehicles in Fleet</span>
                <span className="text-xl font-bold font-mono-numbers text-white">{vehicles.length}</span>
              </div>
              <div className="bg-[#141414] p-3 rounded border border-[#282828]">
                <span className="text-[#888888] block text-[11px]">Available on Lot</span>
                <span className="text-xl font-bold font-mono-numbers text-emerald-400">
                  {vehicles.filter(v => v.availability === 'Available').length}
                </span>
              </div>
              <div className="bg-[#141414] p-3 rounded border border-[#282828]">
                <span className="text-[#888888] block text-[11px]">Customer Inquiries</span>
                <span className="text-xl font-bold font-mono-numbers text-white">{enquiries.length}</span>
              </div>
              <div className="bg-[#141414] p-3 rounded border border-[#282828]">
                <span className="text-[#888888] block text-[11px]">New Inquiries Awaiting Reply</span>
                <span className="text-xl font-bold font-mono-numbers text-amber-400">
                  {enquiries.filter(e => e.status === 'New').length}
                </span>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-[#282828] bg-[#141414]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'inventory'
                      ? 'border-white text-white'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  Vehicle Inventory ({vehicles.length})
                </button>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'enquiries'
                      ? 'border-white text-white'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  Customer Enquiries ({enquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'settings'
                      ? 'border-white text-white'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  System & Maintenance
                </button>
              </div>

              {activeTab === 'inventory' && (
                <button
                  onClick={openAddVehicleModal}
                  className="px-3 py-1.5 bg-white text-[#111111] hover:bg-[#E8E8E8] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Vehicle</span>
                </button>
              )}
            </div>

            {/* Tab 1: Vehicle Inventory Manager */}
            {activeTab === 'inventory' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="overflow-x-auto border border-[#282828] rounded-lg">
                  <table className="w-full text-left text-xs text-[#CCCCCC]">
                    <thead className="bg-[#1C1C1C] text-[#888888] uppercase text-[10px] tracking-wider border-b border-[#282828]">
                      <tr>
                        <th className="py-3 px-4">Vehicle / Stock #</th>
                        <th className="py-3 px-4">Year & Specs</th>
                        <th className="py-3 px-4">Price (JPY)</th>
                        <th className="py-3 px-4">Mileage</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                      {vehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-[#1A1A1A]">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={v.images[0]}
                                alt={v.model}
                                className="w-12 h-9 object-cover rounded bg-black shrink-0"
                              />
                              <div>
                                <div className="font-semibold text-white truncate max-w-[200px]">
                                  {v.brand} {v.model}
                                </div>
                                <div className="text-[10px] font-mono-numbers text-[#777777]">
                                  {v.stockNumber} · {v.chassisVin}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div>{v.year} · {v.transmission}</div>
                            <div className="text-[#777777] text-[11px]">{v.fuelType} · {v.engineCapacityCc}cc</div>
                          </td>

                          <td className="py-3 px-4 font-mono-numbers font-semibold text-white">
                            ¥{v.priceJPY.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 font-mono-numbers">
                            {v.mileageKm.toLocaleString()} km
                          </td>

                          <td className="py-3 px-4 text-[11px] text-[#AAAAAA]">
                            {v.location}
                          </td>

                          <td className="py-3 px-4">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              v.availability === 'Available'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : v.availability === 'In Transit'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-[#222222] text-[#888888]'
                            }`}>
                              {v.availability}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => openEditVehicleModal(v)}
                              className="p-1.5 hover:text-white text-[#AAAAAA] hover:bg-[#252525] rounded"
                              title="Edit specifications or price"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteVehicle(v.id, `${v.brand} ${v.model}`)}
                              className="p-1.5 hover:text-red-400 text-[#777777] hover:bg-red-950/40 rounded"
                              title="Delete listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Customer Enquiries Manager */}
            {activeTab === 'enquiries' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {enquiries.length === 0 ? (
                  <div className="p-12 text-center text-[#777777] text-xs">
                    No customer submissions recorded yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="bg-[#181818] border border-[#282828] rounded-lg p-5 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252525] pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{enq.customerName}</span>
                              <span className="text-xs text-[#888888]">({enq.country})</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                enq.status === 'New'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : enq.status === 'Contacted'
                                  ? 'bg-blue-950 text-blue-300'
                                  : 'bg-[#252525] text-[#888888]'
                              }`}>
                                {enq.status}
                              </span>
                            </div>
                            <div className="text-xs text-[#777777] mt-0.5">
                              Enquiry Date: <span className="font-mono-numbers">{enq.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              aria-label="Enquiry status"
                              value={enq.status}
                              onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                              className="bg-[#202020] border border-[#333333] text-xs text-white rounded p-1.5"
                            >
                              <option value="New">Status: New</option>
                              <option value="Contacted">Status: Contacted</option>
                              <option value="In Progress">Status: In Progress</option>
                              <option value="Closed">Status: Closed</option>
                            </select>

                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1.5 text-[#777777] hover:text-red-400 hover:bg-[#252525] rounded"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer Contact Coordinates */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#1F1F1F] p-3 rounded">
                          <div>
                            <span className="text-[#777777] block text-[10px]">Email Address</span>
                            <a href={`mailto:${enq.email}`} className="text-white hover:underline truncate block">
                              {enq.email}
                            </a>
                          </div>
                          <div>
                            <span className="text-[#777777] block text-[10px]">Telephone / WhatsApp</span>
                            <a href={`tel:${enq.phone}`} className="text-white font-mono-numbers hover:underline">
                              {enq.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-[#777777] block text-[10px]">Vehicle of Interest</span>
                            <span className="text-white font-medium">{enq.vehicleTitle || 'General Sourcing'}</span>
                          </div>
                        </div>

                        {/* Message body */}
                        <p className="text-xs text-[#CCCCCC] bg-[#141414] p-3 rounded border border-[#222222] whitespace-pre-line leading-relaxed">
                          {enq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: System & Maintenance */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-xl">
                <div className="bg-[#181818] border border-[#282828] p-5 rounded-lg space-y-3">
                  <h4 className="text-sm font-bold text-white font-serif-brand">
                    Dealership Inventory Reset
                  </h4>
                  <p className="text-xs text-[#888888] leading-relaxed">
                    Reset vehicle inventory to the curated verified stock (Nissan Fairlady 240Z, Hakosuka GT-R, Honda NSX, BMW E30 M3, Toyota Supra A80, Nissan Figaro, BMW M3 Comp, Lexus LC 500, Porsche 911).
                  </p>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-semibold rounded flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Default Stock</span>
                  </button>
                </div>

                <div className="bg-[#181818] border border-[#282828] p-5 rounded-lg space-y-2 text-xs text-[#888888]">
                  <h4 className="text-sm font-bold text-white font-serif-brand">Dealership Information</h4>
                  <div>Brand Name: <span className="text-white font-semibold">EURO JAPAN IMPORTS</span></div>
                  <div>Principal Owner: <span className="text-white font-semibold">M. Subhan</span></div>
                  <div>Telephone Contact: <span className="text-white font-mono-numbers">+81 90-3037-2807</span></div>
                  <div>Export Hubs: Osaka & Yokohama (Japan)</div>
                  <div>European Hubs: Bremerhaven (Germany), Southampton (UK)</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: Add or Edit Vehicle Listing */}
        {(isAddingNew || editingVehicle) && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
            <div className="bg-[#181818] text-white w-full max-w-2xl rounded-xl border border-[#333333] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-black px-6 py-4 flex items-center justify-between border-b border-[#282828]">
                <h3 className="text-sm font-bold font-serif-brand uppercase tracking-wider text-white">
                  {isAddingNew ? 'Add New Vehicle to Inventory' : `Edit Vehicle: ${editingVehicle?.model}`}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingVehicle(null);
                  }}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVehicle} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Manufacturer / Brand *</label>
                    <select
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value as any)}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    >
                      <option value="Nissan">Nissan</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Mazda">Mazda</option>
                      <option value="Mitsubishi">Mitsubishi</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Audi">Audi</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Model Name *</label>
                    <input
                      type="text"
                      value={formModel}
                      onChange={(e) => setFormModel(e.target.value)}
                      placeholder="e.g. Figaro 1.0 Turbo / M3 Competition"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Year *</label>
                    <input
                      type="number"
                      value={formYear}
                      onChange={(e) => setFormYear(Number(e.target.value))}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white font-mono-numbers"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Price in JPY (¥) *</label>
                    <input
                      type="number"
                      value={formPriceJPY}
                      onChange={(e) => setFormPriceJPY(Number(e.target.value))}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white font-mono-numbers"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Mileage (km) *</label>
                    <input
                      type="number"
                      value={formMileageKm}
                      onChange={(e) => setFormMileageKm(Number(e.target.value))}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white font-mono-numbers"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Transmission</label>
                    <select
                      value={formTransmission}
                      onChange={(e) => setFormTransmission(e.target.value as any)}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Dual-Clutch / DCT">Dual-Clutch / DCT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Fuel Type</label>
                    <select
                      value={formFuelType}
                      onChange={(e) => setFormFuelType(e.target.value as any)}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Availability</label>
                    <select
                      value={formAvailability}
                      onChange={(e) => setFormAvailability(e.target.value as any)}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    >
                      <option value="Available">Available (In Stock)</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Displacement (cc)</label>
                    <input
                      type="number"
                      value={formEngineCapacity}
                      onChange={(e) => setFormEngineCapacity(Number(e.target.value))}
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white font-mono-numbers"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Chassis VIN</label>
                    <input
                      type="text"
                      value={formChassisVin}
                      onChange={(e) => setFormChassisVin(e.target.value)}
                      placeholder="e.g. FK10-014822"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white font-mono-numbers"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Condition Grade</label>
                    <input
                      type="text"
                      value={formConditionGrade}
                      onChange={(e) => setFormConditionGrade(e.target.value)}
                      placeholder="e.g. Grade 4.5 / A"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Tokyo Yard / Yokohama Port"
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 font-medium">Image URL / Path</label>
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="e.g. /src/assets/images/... or https://..."
                      className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#888888] mb-1 font-medium">Vehicle Description & History</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter detailed verified description..."
                    className="w-full bg-[#222222] border border-[#333333] rounded p-2 text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeaturedCheck"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-white"
                  />
                  <label htmlFor="isFeaturedCheck" className="text-white cursor-pointer">
                    Feature on Homepage Showcase
                  </label>
                </div>

                <div className="pt-4 border-t border-[#282828] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingVehicle(null);
                    }}
                    className="px-4 py-2 text-[#888888] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-white text-[#111111] hover:bg-[#E8E8E8] font-semibold uppercase tracking-wider rounded"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
