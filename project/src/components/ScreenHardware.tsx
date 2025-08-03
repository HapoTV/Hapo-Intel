import React from 'react';
import { Monitor, Thermometer, Zap, HardDrive, Cpu, Wifi } from 'lucide-react';

const hardwareData = [
  {
    id: 1,
    name: 'Mall Plaza - Main Entrance',
    model: 'Hapo LED Pro 4K',
    serialNumber: 'HLP4K-2024-001',
    temperature: 42,
    powerConsumption: 850,
    storageUsed: 67,
    cpuUsage: 23,
    signalStrength: 95,
    lastMaintenance: '2024-12-15',
    nextMaintenance: '2025-03-15'
  },
  {
    id: 2,
    name: 'Highway 401 - North Bound',
    model: 'Hapo LED Outdoor Max',
    serialNumber: 'HLOM-2024-002',
    temperature: 38,
    powerConsumption: 1200,
    storageUsed: 45,
    cpuUsage: 18,
    signalStrength: 88,
    lastMaintenance: '2024-11-20',
    nextMaintenance: '2025-02-20'
  },
  {
    id: 3,
    name: 'Sports Center - Parking',
    model: 'Hapo LED Standard',
    serialNumber: 'HLS-2024-003',
    temperature: 55,
    powerConsumption: 650,
    storageUsed: 89,
    cpuUsage: 67,
    signalStrength: 72,
    lastMaintenance: '2024-10-10',
    nextMaintenance: '2025-01-10'
  }
];

export default function ScreenHardware() {
  const getHealthColor = (value: number, type: 'temp' | 'power' | 'storage' | 'cpu' | 'signal') => {
    switch (type) {
      case 'temp':
        if (value > 50) return 'text-red-500';
        if (value > 45) return 'text-amber-500';
        return 'text-green-500';
      case 'storage':
      case 'cpu':
        if (value > 80) return 'text-red-500';
        if (value > 60) return 'text-amber-500';
        return 'text-green-500';
      case 'signal':
        if (value < 70) return 'text-red-500';
        if (value < 85) return 'text-amber-500';
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware Status</h3>
      
      <div className="space-y-6">
        {hardwareData.map((screen) => (
          <div key={screen.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{screen.name}</h4>
                <p className="text-sm text-gray-600">{screen.model} • {screen.serialNumber}</p>
              </div>
              <Monitor className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <Thermometer className={`w-5 h-5 mx-auto mb-1 ${getHealthColor(screen.temperature, 'temp')}`} />
                <p className="text-sm font-medium text-gray-900">{screen.temperature}°C</p>
                <p className="text-xs text-gray-500">Temperature</p>
              </div>
              
              <div className="text-center">
                <Zap className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                <p className="text-sm font-medium text-gray-900">{screen.powerConsumption}W</p>
                <p className="text-xs text-gray-500">Power</p>
              </div>
              
              <div className="text-center">
                <HardDrive className={`w-5 h-5 mx-auto mb-1 ${getHealthColor(screen.storageUsed, 'storage')}`} />
                <p className="text-sm font-medium text-gray-900">{screen.storageUsed}%</p>
                <p className="text-xs text-gray-500">Storage</p>
              </div>
              
              <div className="text-center">
                <Cpu className={`w-5 h-5 mx-auto mb-1 ${getHealthColor(screen.cpuUsage, 'cpu')}`} />
                <p className="text-sm font-medium text-gray-900">{screen.cpuUsage}%</p>
                <p className="text-xs text-gray-500">CPU</p>
              </div>
              
              <div className="text-center">
                <Wifi className={`w-5 h-5 mx-auto mb-1 ${getHealthColor(screen.signalStrength, 'signal')}`} />
                <p className="text-sm font-medium text-gray-900">{screen.signalStrength}%</p>
                <p className="text-xs text-gray-500">Signal</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-gray-500">Last Maintenance: </span>
                  <span className="text-gray-900">{screen.lastMaintenance}</span>
                </div>
                <div>
                  <span className="text-gray-500">Next Due: </span>
                  <span className="text-gray-900">{screen.nextMaintenance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}