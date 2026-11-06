import { INITIAL_VEHICLES } from '../data/vehicles';
import { CustomerEnquiry, Currency, Vehicle } from '../types/vehicle';

const VEHICLES_STORAGE_KEY = 'eji_vehicles_inventory_v2';
const ENQUIRIES_STORAGE_KEY = 'eji_customer_enquiries_v2';
const CURRENCY_STORAGE_KEY = 'eji_selected_currency_v1';

export const CURRENCY_RATES = {
  JPY: 1,
  EUR: 0.00613, // 1 JPY = ~0.00613 EUR (1 EUR = ~163 JPY)
  GBP: 0.00521, // 1 JPY = ~0.00521 GBP (1 GBP = ~192 JPY)
  USD: 0.00658  // 1 JPY = ~0.00658 USD (1 USD = ~152 JPY)
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  JPY: '¥',
  EUR: '€',
  GBP: '£',
  USD: '$'
};

const SAMPLE_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-101',
    date: '2026-03-05 14:22',
    customerName: 'Klaus Reinhardt',
    email: 'klaus.reinhardt@autohaus-munich.de',
    phone: '+49 89 2314 980',
    country: 'Germany',
    vehicleId: 'eji-1971-fairlady-240z',
    vehicleTitle: 'Nissan Fairlady 240Z (S30 Coupe) (1971)',
    message: 'Hello M. Subhan, I am inquiring about shipping the Burnt Orange 240Z from Osaka Yard to Bremerhaven port. Can you provide the undercarriage inspection sheet for German historical H-Kennzeichen registration?',
    preferredContact: 'WhatsApp',
    status: 'New'
  },
  {
    id: 'enq-102',
    date: '2026-03-04 10:15',
    customerName: 'Oliver Chesterfield',
    email: 'o.chesterfield@mayfair-investments.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    vehicleId: 'eji-1971-hakosuka-gtr',
    vehicleTitle: 'Nissan Skyline 2000 GT-R Hakosuka KPGC10 (1971)',
    message: 'Interested in the Hakosuka KPGC10 currently at Yokohama Port. We need container freight to Southampton with marine insurance. Please confirm Prince S20 engine compression values.',
    preferredContact: 'Phone',
    status: 'In Progress'
  },
  {
    id: 'enq-103',
    date: '2026-03-03 18:40',
    customerName: 'Hans-Peter Weber',
    email: 'hp.weber@stuttgart-classics.de',
    phone: '+49 711 902 4431',
    country: 'Germany',
    vehicleId: 'eji-1992-honda-nsx',
    vehicleTitle: 'Honda NSX 3.0 VTEC Coupe NA1 (1992)',
    message: 'Looking at the Formula Red NSX NA1 at Osaka Nanko Port. Is the vehicle equipped with original titanium keys and full Japanese service history?',
    preferredContact: 'Email',
    status: 'Contacted'
  }
];

export class StorageService {
  static getVehicles(): Vehicle[] {
    try {
      const data = localStorage.getItem(VEHICLES_STORAGE_KEY);
      if (!data) {
        this.saveVehicles(INITIAL_VEHICLES);
        return INITIAL_VEHICLES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_VEHICLES;
    }
  }

  static saveVehicles(vehicles: Vehicle[]): void {
    try {
      localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
    } catch (e) {
      console.error('Error saving vehicles to localStorage', e);
    }
  }

  static getVehicleById(id: string): Vehicle | undefined {
    const list = this.getVehicles();
    return list.find(v => v.id === id);
  }

  static saveVehicle(vehicle: Vehicle): void {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === vehicle.id);
    if (index >= 0) {
      vehicles[index] = vehicle;
    } else {
      vehicles.unshift(vehicle);
    }
    this.saveVehicles(vehicles);
  }

  static deleteVehicle(id: string): void {
    const vehicles = this.getVehicles().filter(v => v.id !== id);
    this.saveVehicles(vehicles);
  }

  static getEnquiries(): CustomerEnquiry[] {
    try {
      const data = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (!data) {
        this.saveEnquiries(SAMPLE_ENQUIRIES);
        return SAMPLE_ENQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return SAMPLE_ENQUIRIES;
    }
  }

  static saveEnquiries(enquiries: CustomerEnquiry[]): void {
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Error saving enquiries to localStorage', e);
    }
  }

  static addEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'date' | 'status'>): CustomerEnquiry {
    const enquiries = this.getEnquiries();
    const now = new Date();
    const newEnquiry: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      status: 'New'
    };
    enquiries.unshift(newEnquiry);
    this.saveEnquiries(enquiries);
    return newEnquiry;
  }

  static updateEnquiryStatus(id: string, status: CustomerEnquiry['status']): void {
    const enquiries = this.getEnquiries();
    const target = enquiries.find(e => e.id === id);
    if (target) {
      target.status = status;
      this.saveEnquiries(enquiries);
    }
  }

  static deleteEnquiry(id: string): void {
    const enquiries = this.getEnquiries().filter(e => e.id !== id);
    this.saveEnquiries(enquiries);
  }

  static getCurrency(): Currency {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency;
      if (saved && (saved === 'JPY' || saved === 'EUR' || saved === 'GBP' || saved === 'USD')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'JPY';
  }

  static setCurrency(currency: Currency): void {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch (e) {
      console.error('Error saving currency', e);
    }
  }

  static resetToDefault(): void {
    this.saveVehicles(INITIAL_VEHICLES);
    this.saveEnquiries(SAMPLE_ENQUIRIES);
  }
}

export function formatPrice(priceJPY: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === 'JPY') {
    return `${symbol}${priceJPY.toLocaleString('ja-JP')}`;
  }
  const rate = CURRENCY_RATES[currency];
  const converted = Math.round(priceJPY * rate);
  return `${symbol}${converted.toLocaleString('en-US')}`;
}

export function formatMileage(km: number, currency: Currency): string {
  if (currency === 'GBP' || currency === 'USD') {
    const miles = Math.round(km * 0.621371);
    return `${miles.toLocaleString('en-US')} mi (${km.toLocaleString('en-US')} km)`;
  }
  return `${km.toLocaleString('en-US')} km`;
}
