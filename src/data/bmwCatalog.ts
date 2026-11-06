import { BMWModelFamily } from '../types/vehicle';

export const BMW_MODEL_FAMILIES: BMWModelFamily[] = [
  {
    id: 'bmw-1-series',
    series: 'BMW 1 Series',
    category: 'Sedans & Gran Coupes',
    tagline: 'Compact agility and urban engineering',
    description: 'The entry point into BMW performance. Spanning legendary rear-wheel-drive generations (E87, F20) with inline-6 options (130i, M135i, M140i) to contemporary front-wheel-drive and xDrive architectures (F40, F70).',
    generations: 'E87 (2004–2011) · F20 (2011–2019) · F40 (2019–2024) · F70 (2024+)',
    flagshipVariants: ['M140i Shadow Edition (340 hp)', '128ti', 'M135 xDrive'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-2-series',
    series: 'BMW 2 Series',
    category: 'Coupes & Convertibles',
    tagline: 'Pure driver-focused compact dynamics',
    description: 'Traditional compact proportions with rear-wheel-drive dynamics. Includes the revered F22 Coupe, G42 modern coupe, and the 2 Series Gran Coupe (F44).',
    generations: 'F22/F23 (2014–2021) · G42 (2021+) · F44 Gran Coupe (2020+)',
    flagshipVariants: ['M240i xDrive (374 hp)', '220i M Sport', '230i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-3-series',
    series: 'BMW 3 Series',
    category: 'Sedans & Gran Coupes',
    tagline: 'The definitive sports sedan across five decades',
    description: 'The benchmark of compact executive performance since 1975. Renowned for near 50:50 weight distribution, sharp steering, and legendary inline-six powertrains.',
    generations: 'E30 (1982–1994) · E36 (1990–2000) · E46 (1997–2006) · E90 (2005–2013) · F30 (2011–2019) · G20/G21 LCI (2019+)',
    flagshipVariants: ['M340i xDrive', '330e Plug-in Hybrid', '330i M Sport Touring'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    inStockCount: 1
  },
  {
    id: 'bmw-4-series',
    series: 'BMW 4 Series',
    category: 'Coupes & Convertibles',
    tagline: 'Expressive coupe and Gran Coupe styling',
    description: 'Low-slung grand tourer silhouette with distinctive presence. Includes Coupe, Convertible with fabric soft-top, and the versatile 4-door Gran Coupe.',
    generations: 'F32/F33/F36 (2013–2020) · G22/G23/G26 (2020+)',
    flagshipVariants: ['M440i Gran Coupe', '430i M Sport Cabriolet', '420i Coupe'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    inStockCount: 1
  },
  {
    id: 'bmw-5-series',
    series: 'BMW 5 Series',
    category: 'Sedans & Gran Coupes',
    tagline: 'Executive luxury with effortless long-distance poise',
    description: 'The global standard for executive business sedans and Tourings. Celebrated worldwide for pioneering safety, chassis balance, and executive comfort.',
    generations: 'E28 · E34 · E39 (1995–2003) · E60 (2003–2010) · F10 (2010–2017) · G30 (2017–2023) · G60 (2023+)',
    flagshipVariants: ['540i xDrive M Sport', '530e Touring', '550i V8 xDrive'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-6-series',
    series: 'BMW 6 Series',
    category: 'Coupes & Convertibles',
    tagline: 'Majestic grand touring heritage and Gran Turismo',
    description: 'Iconic Sharknose origins leading into modern grand luxury. E24 classic coupes, the Chris Bangle E63, elegant F06/F12 Gran Coupes, and G32 Gran Turismo.',
    generations: 'E24 Sharknose (1976–1989) · E63/E64 (2003–2010) · F12/F13/F06 (2011–2018) · G32 GT (2017–2023)',
    flagshipVariants: ['650i Gran Coupe M Sport', '640d xDrive M Sport', '635CSi Sharknose'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-7-series',
    series: 'BMW 7 Series',
    category: 'Sedans & Gran Coupes',
    tagline: 'The pinnacle of BMW flagship luxury and innovation',
    description: 'BMW’s supreme executive saloon showcase. From the timeless Paul Bracq E23 and iconic E38, through the V12-powered E65, F01, and carbon-core G11, to the theatrical 31.3-inch Theatre Screen G70.',
    generations: 'E32 (1986–1994) · E38 (1994–2001) · E65 (2001–2008) · F01 (2008–2015) · G11/G12 (2015–2022) · G70 (2022+)',
    flagshipVariants: ['M760Li xDrive V12', '750Li xDrive', '740d M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-8-series',
    series: 'BMW 8 Series',
    category: 'Coupes & Convertibles',
    tagline: 'Breathtaking haute-couture performance GT',
    description: 'The legendary pop-up headlight E31 V12 coupe reborn in the G14/G15/G16 series. Uncompromising stance, handcrafted leather cabins, and twin-turbo V8 dominance.',
    generations: 'E31 (1990–1999) · G14 Convertible · G15 Coupe · G16 Gran Coupe (2018+)',
    flagshipVariants: ['M850i xDrive Coupe (530 hp)', '840i Gran Coupe M Sport', 'E31 850CSi'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x1',
    series: 'BMW X1',
    category: 'X-Series SAV / SUV',
    tagline: 'Versatile compact Sports Activity Vehicle',
    description: 'Urban mobility with authentic BMW practicality. Progressive design evolution from rear-drive E84 to spacious UKL-based F48 and high-tech U11.',
    generations: 'E84 (2009–2015) · F48 (2015–2022) · U11 (2022+)',
    flagshipVariants: ['X1 M35i xDrive (300 hp)', 'xDrive25e Plug-in', 'sDrive20i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x2',
    series: 'BMW X2',
    category: 'X-Series SAV / SUV',
    tagline: 'Extroverted Sports Activity Coupe',
    description: 'Bold coupe silhouette with distinctive C-pillar roundel badges (F39) and sharp fastback angles in the modern U10 generation.',
    generations: 'F39 (2018–2023) · U10 (2024+)',
    flagshipVariants: ['X2 M35i xDrive', 'sDrive18i M Sport', 'xDrive20d'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x3',
    series: 'BMW X3',
    category: 'X-Series SAV / SUV',
    tagline: 'All-terrain capability meets refined everyday balance',
    description: 'The world’s most popular luxury mid-size SAV. From early E83 to best-selling F25, high-tech G01, and latest G45 generation.',
    generations: 'E83 (2003–2010) · F25 (2010–2017) · G01 LCI (2017–2024) · G45 (2024+)',
    flagshipVariants: ['X3 M40i (360 hp)', 'xDrive30e Hybrid', 'xDrive20d M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x4',
    series: 'BMW X4',
    category: 'X-Series SAV / SUV',
    tagline: 'Athletic Sports Activity Coupe with fastback roofline',
    description: 'Fusing rugged SAV ground clearance with sweeping coupe elegance across F26 and G02 generations.',
    generations: 'F26 (2014–2018) · G02 LCI (2018+)',
    flagshipVariants: ['X4 M40i xDrive', 'X4 xDrive30i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x5',
    series: 'BMW X5',
    category: 'X-Series SAV / SUV',
    tagline: 'The vehicle that invented the Sports Activity Vehicle segment',
    description: 'In 1999, the E53 changed the automotive world forever. Followed by the spacious E70, elegant F15, and air-suspended G05.',
    generations: 'E53 (1999–2006) · E70 (2006–2013) · F15 (2013–2018) · G05 LCI (2018+)',
    flagshipVariants: ['X5 M60i xDrive (530 hp V8)', 'xDrive50e PHEV', 'xDrive40i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x6',
    series: 'BMW X6',
    category: 'X-Series SAV / SUV',
    tagline: 'Uncompromising design pioneer and powerhouse SAC',
    description: 'The bold pioneer of the coupe-SUV category. Illuminated Iconic Glow kidney grilles, aggressive rear haunches, and supreme highway presence across E71, F16, and G06.',
    generations: 'E71 (2008–2014) · F16 (2014–2019) · G06 LCI (2019+)',
    flagshipVariants: ['X6 M60i xDrive', 'X6 xDrive40i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-x7',
    series: 'BMW X7',
    category: 'X-Series SAV / SUV',
    tagline: 'Full-size 7-seat presidential luxury on any road',
    description: 'BMW’s grandest flagship SAV. Three full rows of heated seats, Sky Lounge panoramic glass roof, two-axle air suspension, and executive travel comfort.',
    generations: 'G07 (2019–2022) · G07 LCI Split-Headlight (2022+)',
    flagshipVariants: ['X7 M60i V8 Twin-Turbo', 'X7 xDrive40i M Sport', 'Alpina XB7'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-xm',
    series: 'BMW XM',
    category: 'M High-Performance',
    tagline: 'First bespoke standalone M vehicle since the BMW M1',
    description: 'Electrified high-performance hybrid combining M TwinPower Turbo V8 with high-output electric drive. 653 to 748 horsepower of bespoke automotive spectacle.',
    generations: 'G09 (2023+)',
    flagshipVariants: ['XM Label Red (748 hp / 1,000 Nm)', 'XM 50e'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-z4',
    series: 'BMW Z4',
    category: 'Roadsters',
    tagline: 'Classic long-hood, short-deck open-air roadster',
    description: 'Heir to the Z1, Z3, and legendary Z8. From the Henrik Fisker designed Z8 to the Chris Bangle flame-surfaced E85, folding hard-top E89, and joint-developed G29.',
    generations: 'E85/E86 (2002–2008) · E89 (2009–2016) · G29 (2018+)',
    flagshipVariants: ['Z4 M40i Handschalter (Manual)', 'Z4 sDrive30i M Sport'],
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    inStockCount: 1
  },
  {
    id: 'bmw-i-series',
    series: 'BMW i Series',
    category: 'BMW i Electric',
    tagline: 'Fifth-generation eDrive sustainable performance',
    description: 'Visionary electric mobility originating with the carbon-fiber i3 and futuristic i8 hybrid supercar, advancing to the i4 Gran Coupe, i5 Executive, i7 Limousine, and iX SAV.',
    generations: 'i3/i8 Genesis (2013–2020) · i4 / iX / i7 / i5 (2021+)',
    flagshipVariants: ['i4 M50 (544 hp)', 'i7 M70 xDrive (660 hp)', 'iX M60', 'i8 Roadster'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    inStockCount: 0
  },
  {
    id: 'bmw-m-models',
    series: 'BMW M Motorsport',
    category: 'M High-Performance',
    tagline: 'Born on the Nürburgring, engineered for pure motorsport emotion',
    description: 'The world’s most powerful letter. Every genuine BMW M automobile features bespoke chassis reinforcement, high-revving motorsport engines, differential tuning, and racetrack pedigree.',
    generations: 'M3 (E30, E36, E46, E92, F80, G80) · M5 (E28, E34, E39, E60 V10, F10, F90, G90) · M2 (F87, G87) · M4 (F82, G82)',
    flagshipVariants: ['M3 Competition xDrive', 'M4 CSL Lightweight', 'M5 Competition (F90 / G90)', 'M2 Coupe Manual'],
    imageUrl: '/src/assets/images/bmw_tokyo_expressway_1793978772824.jpg',
    inStockCount: 2
  }
];
