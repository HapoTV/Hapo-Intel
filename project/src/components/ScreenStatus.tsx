import React from 'react';
import { Monitor, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

const screens = [
  {
    id: 1,
    name: 'Mall Plaza - Main Entrance',
    location: 'Downtown',
    status: 'online',
    accuracy: 98.5,
    lastUpdate: '30s ago'
  },
  {
    id: 2,
    name: 'Highway 401 - North Bound',
    location: 'Highway',
    status: 'online',
    accuracy: 94.2,
    lastUpdate: '15s ago'
  },
  {
    id: 3,
    name: 'Sports Center - Parking',
    location: 'Sports Complex',
    status: 'warning',
    accuracy: 76.8,
    lastUpdate: '2m ago'
  },
  {
    id: 4,
    name: 'Shopping District - Central',
    location: 'Commercial',
    status: 'offline',
    accuracy: 0,
    lastUpdate: '15m ago'
  },
  {
    id: 5,
    name: 'Airport Terminal - Arrivals',
    location: 'Airport',
    status: 'online',
    accuracy: 96.7,
    lastUpdate: '45s ago'
  }
];

export default function ScreenStatus() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      default:
        return <Wifi className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Screen Status</h3>
      <div className="space-y-4">
        {screens.map((screen) => (
          <div key={screen.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{screen.name}</p>
                <p className="text-sm text-gray-500">{screen.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{screen.accuracy}%</p>
                <p className="text-xs text-gray-500">{screen.lastUpdate}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(screen.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(screen.status)}`}>
                  {screen.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}