import React from 'react';
import { MapPin, Monitor, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const screenLocations = [
  {
    id: 1,
    name: 'Mall Plaza - Main Entrance',
    address: '123 Downtown Ave, Toronto',
    coordinates: { lat: 43.6532, lng: -79.3832 },
    status: 'online',
    peopleToday: 2847,
    vehiclesToday: 892,
    uptime: 99.8
  },
  {
    id: 2,
    name: 'Highway 401 - North Bound',
    address: 'Highway 401 KM 45, Mississauga',
    coordinates: { lat: 43.5890, lng: -79.6441 },
    status: 'online',
    peopleToday: 1234,
    vehiclesToday: 4392,
    uptime: 98.5
  },
  {
    id: 3,
    name: 'Sports Center - Parking',
    address: '456 Sports Complex Dr, Markham',
    coordinates: { lat: 43.8561, lng: -79.3370 },
    status: 'warning',
    peopleToday: 892,
    vehiclesToday: 234,
    uptime: 87.2
  },
  {
    id: 4,
    name: 'Shopping District - Central',
    address: '789 Commercial St, Vaughan',
    coordinates: { lat: 43.8361, lng: -79.4985 },
    status: 'offline',
    peopleToday: 0,
    vehiclesToday: 0,
    uptime: 0
  },
  {
    id: 5,
    name: 'Airport Terminal - Arrivals',
    address: 'Pearson Airport Terminal 1',
    coordinates: { lat: 43.6777, lng: -79.6248 },
    status: 'online',
    peopleToday: 5234,
    vehiclesToday: 1847,
    uptime: 99.9
  }
];

export default function ScreenMap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4 text-white" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-white" />;
      default: return <Monitor className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Screen Locations</h3>
      
      {/* Map placeholder - in production this would be an actual map */}
      <div className="bg-gray-100 rounded-lg h-64 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500">Real-time screen locations and status</p>
          </div>
        </div>
        
        {/* Sample location markers */}
        {screenLocations.map((screen, index) => (
          <div
            key={screen.id}
            className={`absolute w-6 h-6 rounded-full ${getStatusColor(screen.status)} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 2) * 20}%`
            }}
            title={screen.name}
          >
            {getStatusIcon(screen.status)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenLocations.map((screen) => (
          <div key={screen.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-sm">{screen.name}</h4>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(screen.status)}`} />
            </div>
            <p className="text-xs text-gray-600 mb-3">{screen.address}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">People Today</p>
                <p className="font-semibold text-gray-900">{screen.peopleToday.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Vehicles Today</p>
                <p className="font-semibold text-gray-900">{screen.vehiclesToday.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Uptime</p>
                <p className="font-semibold text-gray-900">{screen.uptime}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}