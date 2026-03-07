export interface RadioStation {
  id: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  favicon: string;
  country: string;
  countrycode: string;
  language: string;
  tags: string;
  votes: number;
  codec: string;
  bitrate: number;
  homepage: string;
}

// Curated stations with their actual names for better display
export const CURATED_STATIONS: Record<string, { searchName: string; displayName: string }[]> = {
  india: [
    { searchName: 'Radio Mirchi', displayName: 'Radio Mirchi 98.3 FM' },
    { searchName: 'Red FM', displayName: 'Red FM 93.5' },
    { searchName: 'Big FM', displayName: 'Big FM 92.7' },
    { searchName: 'Radio City', displayName: 'Radio City 91.1 FM' },
    { searchName: 'All India Radio', displayName: 'All India Radio' },
    { searchName: 'Fever FM', displayName: 'Fever FM 104' },
  ],
  us: [
    { searchName: 'NPR', displayName: 'NPR News' },
    { searchName: 'iHeartRadio', displayName: 'iHeartRadio' },
    { searchName: 'Hot 97', displayName: 'Hot 97 FM' },
    { searchName: 'KISS FM', displayName: 'KISS FM' },
    { searchName: 'Power 106', displayName: 'Power 106 FM' },
    { searchName: 'Z100', displayName: 'Z100 New York' },
  ],
  europe: [
    { searchName: 'BBC Radio 1', displayName: 'BBC Radio 1' },
    { searchName: 'BBC Radio 2', displayName: 'BBC Radio 2' },
    { searchName: 'RTL', displayName: 'RTL Radio' },
    { searchName: 'NRJ', displayName: 'NRJ Radio' },
    { searchName: 'Antenne Bayern', displayName: 'Antenne Bayern' },
    { searchName: 'Europa FM', displayName: 'Europa FM' },
  ],
  australia: [
    { searchName: 'Triple J', displayName: 'Triple J' },
    { searchName: 'Nova', displayName: 'Nova FM' },
    { searchName: 'ABC Radio', displayName: 'ABC Radio' },
    { searchName: 'Hit FM', displayName: 'Hit FM Australia' },
    { searchName: 'KIIS FM', displayName: 'KIIS FM Sydney' },
  ],
  southamerica: [
    { searchName: 'Gaúcha', displayName: 'Rádio Gaúcha' },
    { searchName: 'Caracol', displayName: 'Caracol Radio' },
    { searchName: 'Jovem Pan', displayName: 'Jovem Pan FM' },
    { searchName: 'Radio Nacional', displayName: 'Radio Nacional' },
    { searchName: 'Radio Disney', displayName: 'Radio Disney' },
  ],
  africa: [
    { searchName: 'Metro FM', displayName: 'Metro FM South Africa' },
    { searchName: 'Kaya FM', displayName: 'Kaya FM 95.9' },
    { searchName: 'Classic FM', displayName: 'Classic FM Nigeria' },
    { searchName: 'Capital FM', displayName: 'Capital FM Kenya' },
    { searchName: 'YFM', displayName: 'YFM Johannesburg' },
  ],
  asiapacific: [
    { searchName: 'J-Wave', displayName: 'J-Wave Tokyo' },
    { searchName: 'KBS', displayName: 'KBS Radio Korea' },
    { searchName: 'Radio Taiwan', displayName: 'Radio Taiwan International' },
    { searchName: 'NHK', displayName: 'NHK Radio Japan' },
    { searchName: 'CNA', displayName: 'CNA Singapore' },
  ],
  middleeast: [
    { searchName: 'Dubai Eye', displayName: 'Dubai Eye 103.8' },
    { searchName: 'Radio Jordan', displayName: 'Radio Jordan' },
    { searchName: 'MBC FM', displayName: 'MBC FM' },
    { searchName: 'Nile FM', displayName: 'Nile FM Egypt' },
    { searchName: 'Virgin Radio', displayName: 'Virgin Radio Dubai' },
  ],
};

export interface Region {
  id: string;
  name: string;
  emoji: string;
  countries: string[];
  accent: string;
  gradient: string;
  premium?: boolean;
}

export const REGIONS: Region[] = [
  {
    id: 'india',
    name: 'India',
    emoji: '🇮🇳',
    countries: ['IN'],
    accent: 'india-saffron',
    gradient: 'from-orange-500 via-white to-green-600',
  },
  {
    id: 'us',
    name: 'United States',
    emoji: '🇺🇸',
    countries: ['US'],
    accent: 'us-blue',
    gradient: 'from-blue-600 via-white to-red-600',
  },
  {
    id: 'europe',
    name: 'Europe',
    emoji: '🇪🇺',
    countries: ['GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI', 'PL'],
    accent: 'europe-gold',
    gradient: 'from-blue-700 to-yellow-400',
  },
  {
    id: 'australia',
    name: 'Australia',
    emoji: '🇦🇺',
    countries: ['AU', 'NZ'],
    accent: 'australia-teal',
    gradient: 'from-teal-500 to-yellow-500',
    premium: true,
  },
  {
    id: 'southamerica',
    name: 'South America',
    emoji: '🌎',
    countries: ['BR', 'AR', 'CL', 'CO', 'PE', 'VE'],
    accent: 'southamerica-emerald',
    gradient: 'from-emerald-500 to-yellow-400',
    premium: true,
  },
  {
    id: 'africa',
    name: 'Africa',
    emoji: '🌍',
    countries: ['ZA', 'NG', 'KE', 'EG', 'MA', 'GH'],
    accent: 'africa-orange',
    gradient: 'from-orange-600 to-yellow-500',
    premium: true,
  },
  {
    id: 'asiapacific',
    name: 'Asia Pacific',
    emoji: '🌏',
    countries: ['JP', 'KR', 'TW', 'SG', 'TH', 'VN'],
    accent: 'asia-red',
    gradient: 'from-red-500 to-pink-500',
    premium: true,
  },
  {
    id: 'middleeast',
    name: 'Middle East',
    emoji: '🇦🇪',
    countries: ['AE', 'SA', 'JO', 'EG', 'QA'],
    accent: 'middleeast-gold',
    gradient: 'from-amber-500 to-yellow-500',
    premium: true,
  },
];
