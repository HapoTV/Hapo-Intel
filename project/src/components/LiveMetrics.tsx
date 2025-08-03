import React, { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';

export default function LiveMetrics() {
  const [isLive, setIsLive] = useState(true);
  const [metrics, setMetrics] = useState({
    currentPeople: 0,
    currentVehicles: 0,
    averageSpeed: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setMetrics({
          currentPeople: Math.floor(Math.random() * 50) + 10,
          currentVehicles: Math.floor(Math.random() * 25) + 5,
          averageSpeed: Math.floor(Math.random() * 30) + 40
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Metrics</h3>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            isLive 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {isLive ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span>{isLive ? 'Live' : 'Offline'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className={`w-5 h-5 ${isLive ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.currentPeople}</p>
          <p className="text-sm text-gray-600">People Now</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className={`w-5 h-5 ${isLive ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.currentVehicles}</p>
          <p className="text-sm text-gray-600">Vehicles Now</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className={`w-5 h-5 ${isLive ? 'text-purple-500 animate-pulse' : 'text-gray-400'}`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.averageSpeed}</p>
          <p className="text-sm text-gray-600">Avg Speed</p>
        </div>
      </div>
    </div>
  );
}