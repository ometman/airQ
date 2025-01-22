export interface AirQualityData {
  aqi: number;
  status: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  location: string;
  prediction: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  healthRecommendations: {
    general: string;
    sensitive: string;
    outdoor: string;
  };
  timestamp: number;
}

export interface HistoricalData {
  timestamp: number;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
}

export interface TrafficData {
  congestionLevel: number;
  vehicleCount: number;
  timestamp: number;
}

export interface PollutionHotspot {
  id: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  severity: 'low' | 'medium' | 'high';
  pollutants: Record<string, number>;
  factors: string[];
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
}