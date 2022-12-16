export interface ApiMonetizationsParams {
  start: string;
  end: string;
  dimensions: string;
  aggregates: string;
}

export enum Country {
  US = "US",
  FR = "FR",
  UK = "UK",
  JP = "JP",
  AU = "AU",
  SP = "SP"
}

export enum OS {
  iOS = "iOS",
  android = "Android"
}

export interface ApiMonetization {
  date: string;
  country: Country;
  format: string;
  os: OS;
  game: string;
  placement: string;
  views: number;
  conversions: number;
  revenue: number;
}
