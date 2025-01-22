import React, { useState, useEffect } from 'react'
import { Wind, UserCircle, LogOut, MapPin } from 'lucide-react'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { AuthModal } from './components/AuthModal'
import { Tabs } from './components/Tabs'
import { MonitoringView } from './components/MonitoringView'
import { AnalysisView } from './components/AnalysisView'
import { PredictionView } from './components/PredictionView'
import { LocationSelector } from './components/LocationSelector'
import { fetchAirQualityData, fetchHistoricalData } from './services/airQuality'
import type { AirQualityData, HistoricalData, PollutionHotspot, Location } from './types'

const mockHotspots: PollutionHotspot[] = [
  {
    id: '1',
    location: 'Downtown',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    severity: 'high',
    pollutants: { pm25: 35, no2: 45 },
    factors: ['Heavy traffic', 'Construction activity']
  },
  {
    id: '2',
    location: 'Industrial District',
    coordinates: { lat: 37.7600, lng: -122.4000 },
    severity: 'medium',
    pollutants: { pm10: 75, so2: 30 },
    factors: ['Industrial emissions', 'Port activity']
  },
  {
    id: '3',
    location: 'Residential Area',
    coordinates: { lat: 37.7900, lng: -122.4300 },
    severity: 'low',
    pollutants: { pm25: 12, no2: 15 },
    factors: ['Residential heating', 'Local traffic']
  }
]

const mockPredictions = Array.from({ length: 24 }, (_, i) => ({
  timestamp: Date.now() + i * 3600 * 1000,
  aqi: 40 + Math.sin(i / 4) * 20,
  confidence: 90 - Math.abs(Math.sin(i / 8) * 20),
  factors: [
    'Temperature inversion expected',
    'Increased traffic due to event',
    'Weather system approaching'
  ]
}))

const mockAlerts = [
  {
    level: 'high' as const,
    message: 'High pollution levels expected tomorrow due to weather conditions',
    timestamp: Date.now() + 24 * 3600 * 1000
  },
  {
    level: 'medium' as const,
    message: 'Moderate increase in PM2.5 levels expected during rush hour',
    timestamp: Date.now() + 12 * 3600 * 1000
  },
  {
    level: 'low' as const,
    message: 'Air quality expected to improve by evening',
    timestamp: Date.now() + 6 * 3600 * 1000
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('monitoring')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AirQualityData | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState(auth.currentUser)
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: 37.7749,
    lng: -122.4194,
    name: 'San Francisco, CA'
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeoutId: number | undefined;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [airQualityData, historicalDataResult] = await Promise.all([
          fetchAirQualityData(selectedLocation.lat, selectedLocation.lng),
          fetchHistoricalData(selectedLocation.lat, selectedLocation.lng)
        ]);

        if (mounted) {
          setData(airQualityData);
          setHistoricalData(historicalDataResult);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch air quality data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const intervalId = window.setInterval(fetchData, 300000); // Update every 5 minutes

    return () => {
      mounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [selectedLocation]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({
      lat,
      lng,
      name: 'Loading...' // You would typically use a reverse geocoding service here
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wind className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">AirWatch AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{selectedLocation.name}</span>
              </div>
              {user ? (
                <button
                  onClick={() => signOut(auth)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <LocationSelector
          onLocationSelect={handleLocationSelect}
          selectedLocation={selectedLocation}
        />
        
        <div className="mt-8">
          <Tabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
        
        <div className="mt-8">
          {activeTab === 'monitoring' && (
            <MonitoringView data={data} />
          )}
          {activeTab === 'analysis' && (
            <AnalysisView
              historicalData={historicalData}
              hotspots={mockHotspots}
            />
          )}
          {activeTab === 'prediction' && (
            <PredictionView
              predictions={mockPredictions}
              alerts={mockAlerts}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App