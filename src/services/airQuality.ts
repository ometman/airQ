import { AirQualityData, HistoricalData } from '../types';

const OPENWEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key

// Mock data for when API key is not configured
const mockCurrentData = {
  aqi: 42,
  status: 'Good',
  temperature: 22,
  humidity: 45,
  windSpeed: 12,
  location: 'San Francisco, CA',
  prediction: 'Moderate conditions expected in next 24h',
  pollutants: {
    pm25: 15,
    pm10: 25,
    o3: 35,
    no2: 20,
    so2: 10,
    co: 0.8
  },
  timestamp: Date.now()
};

export async function fetchAirQualityData(lat: number, lng: number): Promise<AirQualityData> {
  // If API key is not configured, return mock data
  if (OPENWEATHER_API_KEY === 'YOUR_API_KEY') {
    console.log('Using mock data - please configure OpenWeather API key for real data');
    return {
      ...mockCurrentData,
      healthRecommendations: getHealthRecommendations(mockCurrentData.aqi),
      timestamp: Date.now()
    };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`
    );
  //  const response = await fetch('https://data.api.xweather.com/airquality/:auto?format=geojson&client_id=ayD9sJP6PawyfydwXdofb&client_secret=f1BUBm5MAxOGWik9X5ALfE5bUW0mwwCm7Gq86Pjn')
    // .then((response) => {
    //     return response.json();
    // })
    // .then((json) => {
    //     if (!json.success) {
    //         console.log('Oh no!');
    //     } else {
    //         console.log(json);
    //     }
    // })
    // .catch((error) => {
    //     console.log('Oh no!');
    // });
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }



    const data = await response.json();
    console.log(data)
    return {
      aqi: data.list[0].main.aqi * 20,
      status: getAQIStatus(data.list[0].main.aqi * 20),
      temperature: 0,
      humidity: 0,
      windSpeed: 0,
      location: 'Loading...',
      prediction: 'Analyzing data...',
      pollutants: {
        pm25: data.list[0].components.pm2_5,
        pm10: data.list[0].components.pm10,
        o3: data.list[0].components.o3,
        no2: data.list[0].components.no2,
        so2: data.list[0].components.so2,
        co: data.list[0].components.co
      },
      healthRecommendations: getHealthRecommendations(data.list[0].main.aqi * 20),
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}

export async function fetchHistoricalData(lat: number, lng: number): Promise<HistoricalData[]> {
  // If API key is not configured, return mock data
  if (OPENWEATHER_API_KEY === 'YOUR_API_KEY') {
    console.log('Using mock data - please configure OpenWeather API key for real data');
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: Date.now() - i * 3600 * 1000,
      aqi: 30 + Math.random() * 30,
      pm25: 10 + Math.random() * 20,
      pm10: 20 + Math.random() * 20,
      o3: 25 + Math.random() * 20,
      no2: 15 + Math.random() * 15,
      so2: 5 + Math.random() * 10,
      co: 0.5 + Math.random() * 0.5
    })).reverse();
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lng}&start=${Math.floor(Date.now()/1000 - 86400)}&end=${Math.floor(Date.now()/1000)}&appid=${OPENWEATHER_API_KEY}`
    );
    // const response = await fetch('https://data.api.xweather.com/airquality/:auto?format=geojson&client_id=ayD9sJP6PawyfydwXdofb&client_secret=f1BUBm5MAxOGWik9X5ALfE5bUW0mwwCm7Gq86Pjn')

    
    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }

    const data = await response.json();
    
    return data.list.map((item: any) => ({
      timestamp: item.dt * 1000,
      aqi: item.main.aqi * 20,
      pm25: item.components.pm2_5,
      pm10: item.components.pm10,
      o3: item.components.o3,
      no2: item.components.no2,
      so2: item.components.so2,
      co: item.components.co
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}

function getAQIStatus(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

function getHealthRecommendations(aqi: number) {
  if (aqi <= 50) {
    return {
      general: 'Air quality is good. It\'s a great day to be active outside.',
      sensitive: 'No special precautions needed for sensitive groups.',
      outdoor: 'All outdoor activities are safe to continue as normal.'
    };
  }
  
  if (aqi <= 100) {
    return {
      general: 'Air quality is acceptable. Consider reducing prolonged outdoor exertion if you are sensitive to air pollution.',
      sensitive: 'Children and people with respiratory diseases should limit prolonged outdoor exposure.',
      outdoor: 'It\'s still OK to be active outside, but take more breaks and do less intense activities.'
    };
  }
  
  return {
    general: 'Air quality is poor. Limit outdoor activities.',
    sensitive: 'Sensitive groups should avoid outdoor activities.',
    outdoor: 'Consider moving activities indoors.'
  };
}

