export type VehicleBrand =
  | 'Nissan'
  | 'BMW'
  | 'Mercedes-Benz'
  | 'Toyota'
  | 'Honda'
  | 'Lexus'
  | 'Mazda'
  | 'Mitsubishi'
  | 'Subaru'
  | 'Suzuki'
  | 'Audi'
  | 'Volkswagen'
  | 'Porsche'
  | 'Other';

export type AvailabilityStatus =
  | 'Available'
  | 'In Transit'
  | 'Reserved'
  | 'Sold'
  | 'Available on Order';

export type Currency = 'JPY' | 'EUR' | 'GBP' | 'USD';

export interface Vehicle {
  id: string;
  stockNumber: string;
  brand: VehicleBrand;
  model: string;
  subModel?: string;
  year: number;
  priceJPY: number;
  priceEUR: number;
  priceGBP: number;
  priceUSD: number;
  mileageKm: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch / DCT';
  engineCapacityCc: number;
  engineCode?: string;
  powerHp?: number;
  driveTrain: 'RWD' | 'FWD' | 'AWD / 4WD';
  exteriorColor: string;
  interiorColor: string;
  conditionGrade: string; // e.g. "Grade 4.5 / A", "Grade 5.0", "Mint Classic"
  chassisVin: string;
  location: string; // e.g. "Tokyo Yard, Japan", "Yokohama Port Hub", "Bremerhaven Depot, Germany"
  availability: AvailabilityStatus;
  isFeatured?: boolean;
  isFigaroSpecial?: boolean;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  documentation: {
    exportCertificate: boolean;
    auctionSheetAvailable: boolean;
    tuvComplianceReady?: boolean;
    v5cUkImportReady?: boolean;
    mileageVerified: boolean;
  };
  dateAdded: string;
}

export interface BMWModelFamily {
  id: string;
  series: string;
  category: 'Sedans & Gran Coupes' | 'Coupes & Convertibles' | 'X-Series SAV / SUV' | 'M High-Performance' | 'BMW i Electric' | 'Roadsters';
  tagline: string;
  description: string;
  generations: string;
  flagshipVariants: string[];
  imageUrl: string;
  inStockCount: number;
}

export interface CustomerEnquiry {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  vehicleId?: string;
  vehicleTitle?: string;
  message: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
}

export interface CurrencyRates {
  JPY: number; // base 1
  EUR: number; // 0.0061
  GBP: number; // 0.0052
  USD: number; // 0.0066
}
