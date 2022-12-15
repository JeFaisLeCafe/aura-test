export interface ApiMonetizationsParams {
  start: string;
  end: string;
  dimensions: string;
  aggregates: string;
}

export interface ApiMonetization {
  date: string;
  country: string;
  format: string;
  os: string;
  game: string;
  placement: string;
  views: number;
  conversions: number;
  revenue: number;
}
