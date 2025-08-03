import React, { useState } from 'react';
import { Car, Truck, Bike, Bus, Zap, TrendingUp, Calendar, Clock } from 'lucide-react';

const vehicleTypeData = [
  {
    type: 'Cars',
    icon: Car,
    count: 8247,
    percentage: 68.5,
    change: '+12.3%',
    changeType: 'positive' as const,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    hourlyData: [
      { hour: '6AM', count: 145 },
      { hour: '8AM', count: 420 },
      { hour: '12PM', count: 380 },
      { hour: '5PM', count: 450 },
      { hour: '8PM', count: 220 },
      { hour: '11PM', count: 85 }
    ]
  },
  {
    type: 'Trucks',
    icon: Truck,
    count: 2134,
    percentage: 17.7,
    change: '+8.9%',
    changeType: 'positive' as const,
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-800',
    hourlyData: [
      { hour: '6AM', count: 85 },
      { hour: '8AM', count: 120 },
      { hour: '12PM', count: 95 },
      { hour: '5PM', count: 110 },
      { hour: '8PM', count: 45 },
      { hour: '11PM', count: 25 }
    ]
  },
  {
    type: 'Motorcycles',
    icon: Bike,
    count: 1456,
    percentage: 12.1,
    change: '+15.2%',
    changeType: 'positive' as const,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    hourlyData: [
      { hour: '6AM', count: 35 },
      { hour: '8AM', count: 85 },
      { hour: '12PM', count: 65 },
      { hour: '5PM', count: 95 },
      { hour: '8PM', count: 55 },
      { hour: '11PM', count: 15 }
    ]
  },
  {
    type: 'Buses',
    icon: Bus,
    count: 203,
    percentage: 1.7,
    change: '-2.1%',
    changeType: 'negative' as const,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    hourlyData: [
      { hour: '6AM', count: 8 },
      { hour: '8AM', count: 15 },
      { hour: '12PM', count: 12 },
      { hour: '5PM', count: 18 },
      { hour: '8PM', count: 10 },
      { hour: '11PM', count: 3 }
    ]
  }
];

const speedAnalytics = [
  { range: '0-30 km/h', count: 1847, percentage: 15.3, color: '#EF4444' },
  { range: '31-50 km/h', count: 4521, percentage: 37.5, color: '#F59E0B' },
  { range: '51-70 km/h', count: 4892, percentage: 40.6, color: '#10B981' },
  { range: '71+ km/h', count: 780, percentage: 6.6, color: '#8B5CF6' }
];

const locationBreakdown = [
  { location: 'Highway 401 - North', cars: 3247, trucks: 892, motorcycles: 456, buses: 89 },
  { location: 'Highway 401 - South', cars: 2891, trucks: 734, motorcycles: 523, buses: 67 },
  { location: 'Mall Plaza Entrance', cars: 1456, trucks: 234, motorcycles: 289, buses: 23 },
  { location: 'Sports Center Parking', cars: 653, trucks: 274, motorcycles: 188, buses: 24 }
];

export default function VehicleTypes() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('today');

  const totalVehicles = vehicleTypeData.reduce((sum, vehicle) => sum + vehicle.count, 0);

  return (
    <div className="space-y-6">
      {/* Vehicle Type Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicleTypeData.map((vehicle) => {
          const Icon = vehicle.icon;
          return (
            <div
              key={vehicle.type}
              onClick={() => setSelectedVehicle(selectedVehicle === vehicle.type ? null : vehicle.type)}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedVehicle === vehicle.type ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${vehicle.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{vehicle.count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{vehicle.percentage}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{vehicle.type}</h3>
                  <span className={`text-sm font-medium ${
                    vehicle.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {vehicle.changeType === 'positive' ? '↗' : '↘'} {vehicle.change}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${vehicle.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${vehicle.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Distribution</h3>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          {selectedVehicle ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Showing hourly data for: <span className="font-semibold">{selectedVehicle}</span>
              </p>
              {vehicleTypeData
                .find(v => v.type === selectedVehicle)
                ?.hourlyData.map((data, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 text-sm text-gray-600 font-medium">
                    {data.hour}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        vehicleTypeData.find(v => v.type === selectedVehicle)?.color || 'bg-blue-500'
                      }`}
                      style={{
                        width: `${(data.count / Math.max(...(vehicleTypeData.find(v => v.type === selectedVehicle)?.hourlyData.map(d => d.count) || [1]))) * 100}%`
                      }}
                    />
                  </div>
                  <div className="w-12 text-sm font-semibold text-gray-900">
                    {data.count}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select a vehicle type to view hourly distribution</p>
            </div>
          )}
        </div>

        {/* Speed Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Speed Distribution</h3>
          <div className="space-y-4">
            {speedAnalytics.map((speed, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-gray-600 font-medium">
                  {speed.range}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${speed.percentage}%`,
                      backgroundColor: speed.color
                    }}
                  />
                </div>
                <div className="w-16 text-sm font-semibold text-gray-900">
                  {speed.count.toLocaleString()}
                </div>
                <div className="w-12 text-xs text-gray-500">
                  {speed.percentage}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-900">Average Speed: 52.3 km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">+3.2 km/h vs last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Types by Location</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Cars</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Trucks</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Motorcycles</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Buses</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {locationBreakdown.map((location, index) => {
                const total = location.cars + location.trucks + location.motorcycles + location.buses;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-gray-900">{location.location}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-blue-600">{location.cars.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{((location.cars / total) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-green-600">{location.trucks.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{((location.trucks / total) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-amber-600">{location.motorcycles.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{((location.motorcycles / total) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-purple-600">{location.buses.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{((location.buses / total) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 font-bold text-gray-900">{total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detection Accuracy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Accuracy by Vehicle Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicleTypeData.map((vehicle) => {
            const Icon = vehicle.icon;
            const accuracy = Math.floor(Math.random() * 10) + 90; // Simulated accuracy between 90-99%
            return (
              <div key={vehicle.type} className={`${vehicle.lightColor} rounded-lg p-4`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-5 h-5 ${vehicle.textColor}`} />
                  <span className={`font-semibold ${vehicle.textColor}`}>{vehicle.type}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{accuracy}%</div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${vehicle.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}