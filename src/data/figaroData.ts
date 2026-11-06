export interface FigaroColorway {
  name: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  hex: string;
  japaneseName: string;
  description: string;
  unitsPercentage: string;
}

export const FIGARO_SEASONAL_COLORS: FigaroColorway[] = [
  {
    name: 'Pale Aqua',
    season: 'Summer',
    hex: '#7FA9A4',
    japaneseName: 'ペールアクア (Summer Sky)',
    description: 'The defining Figaro shade inspired by bright coastal summer skies and vintage 1950s European roadsters. Features off-white contrasting roof and ivory leather.',
    unitsPercentage: '39% of production'
  },
  {
    name: 'Emerald Green',
    season: 'Spring',
    hex: '#3E5C52',
    japaneseName: 'エメラルドグリーン (Spring Meadow)',
    description: 'A deep, rich botanical green evocative of fresh spring foliage in Japanese zen gardens. Paired with polished chrome bumpers and cream hubcaps.',
    unitsPercentage: '29% of production'
  },
  {
    name: 'Topaz Mist',
    season: 'Autumn',
    hex: '#967858',
    japaneseName: 'トパーズミスト (Autumn Harvest)',
    description: 'The rarest of the four original factory colors, Topaz Mist features an earthy bronze-caramel hue representing autumn leaves and harvest sunsets.',
    unitsPercentage: '11% of production (Most Rare)'
  },
  {
    name: 'Lapis Grey',
    season: 'Winter',
    hex: '#6B7A82',
    japaneseName: 'ラピスグレー (Winter Frost)',
    description: 'An understated slate grey with soft blue undertones reflecting serene Japanese winter skies and snow-dusted alpine passes.',
    unitsPercentage: '21% of production'
  }
];

export const FIGARO_TECHNICAL_SPECS = [
  { label: 'Production Period', value: '1991 (Limited to ~20,000 units by public lottery)' },
  { label: 'Body Style', value: '2-Door Fixed-Profile Convertible with retractable soft-top' },
  { label: 'Design Origin', value: 'Shoji Takahashi & Nissan Pike Factory (Yokosuka, Japan)' },
  { label: 'Engine Code', value: 'Nissan MA10E-T 0.98L (987 cc)' },
  { label: 'Aspiration', value: 'Water-Cooled Inline-4 with Turbocharger & ECCS EFI' },
  { label: 'Power Output', value: '76 PS (56 kW; 75 bhp) @ 6,000 RPM' },
  { label: 'Max Torque', value: '106 N·m (78 lb·ft) @ 4,400 RPM' },
  { label: 'Transmission', value: '3-Speed Hydraulic Automatic with Floor Console Shift' },
  { label: 'Drivetrain & Layout', value: 'Front-Engine, Front-Wheel-Drive (FF)' },
  { label: 'Kerb Weight', value: '810 kg (1,786 lb)' },
  { label: 'Dimensions (L × W × H)', value: '3,740 mm × 1,630 mm × 1,365 mm' },
  { label: 'Wheelbase', value: '2,300 mm (90.6 in)' },
  { label: 'Suspension', value: 'Front MacPherson Struts / Rear 4-Link Coil Springs' },
  { label: 'Brakes', value: 'Front Ventilated Discs / Rear Leading-Trailing Drums' },
  { label: 'Standard Equipment', value: 'Ivory Connolly-style leather seats, Air Conditioning, Retractable Soft-Top with glass defrost rear window, Retro Claric/Technics CD-Cassette Audio' }
];
