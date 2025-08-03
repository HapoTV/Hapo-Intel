import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import Chart from './components/Chart';
import RecentActivity from './components/RecentActivity';
import LiveMetrics from './components/LiveMetrics';
import ScreenStatus from './components/ScreenStatus';
import ScreenMap from './components/ScreenMap';
import ScreenHardware from './components/ScreenHardware';
import ContentManagement from './components/ContentManagement';
import MaintenanceSchedule from './components/MaintenanceSchedule';
import Reports from './components/Reports';
import VehicleTypes from './components/VehicleTypes';
import CameraManagement from './components/CameraManagement';
import TaxiAnalytics from './components/TaxiAnalytics';
import Alerts from './components/Alerts';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Export from './components/Export';
import Security from './components/Security';
import DataManagement from './components/DataManagement';
import { Users, Car, Monitor, TrendingUp, AlertTriangle, Calendar, Zap, HardDrive } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const todayStats = [
    {
      title: 'Total People Detected',
      value: '12,847',
      change: '+12.3% from yesterday',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Vehicle Traffic',
      value: '4,392',
      change: '+8.1% from yesterday',
      changeType: 'positive' as const,
      icon: Car,
      iconColor: 'bg-green-500'
    },
    {
      title: 'Active Screens',
      value: '24/27',
      change: '3 offline',
      changeType: 'negative' as const,
      icon: Monitor,
      iconColor: 'bg-purple-500'
    },
    {
      title: 'Avg Accuracy',
      value: '94.2%',
      change: '+2.1% this week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      iconColor: 'bg-emerald-500'
    }
  ];

  const screenStats = [
    {
      title: 'Total LED Screens',
      value: '27',
      change: '3 new installations',
      changeType: 'positive' as const,
      icon: Monitor,
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Network Uptime',
      value: '99.2%',
      change: '+0.5% this month',
      changeType: 'positive' as const,
      icon: TrendingUp,
      iconColor: 'bg-green-500'
    },
    {
      title: 'Power Consumption',
      value: '24.8 kW',
      change: '-2.1% vs last week',
      changeType: 'positive' as const,
      icon: Zap,
      iconColor: 'bg-amber-500'
    },
    {
      title: 'Storage Usage',
      value: '67%',
      change: 'Across all screens',
      changeType: 'neutral' as const,
      icon: HardDrive,
      iconColor: 'bg-purple-500'
    }
  ];

  const peopleAnalytics = [
    { label: 'Morning', value: 320, color: '#3B82F6' },
    { label: 'Afternoon', value: 480, color: '#10B981' },
    { label: 'Evening', value: 650, color: '#F59E0B' },
    { label: 'Night', value: 180, color: '#8B5CF6' }
  ];

  const vehicleAnalytics = [
    { label: 'Cars', value: 1240, color: '#3B82F6' },
    { label: 'Trucks', value: 340, color: '#10B981' },
    { label: 'Motorcycles', value: 180, color: '#F59E0B' },
    { label: 'Buses', value: 45, color: '#EF4444' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Overview</h1>
              <p className="text-gray-600 mt-2">Real-time insights from your LED screen network</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {todayStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Chart 
                    title="People Traffic by Time"
                    data={peopleAnalytics}
                    type="bar"
                  />
                  <Chart 
                    title="Vehicle Types Detected"
                    data={vehicleAnalytics}
                    type="bar"
                  />
                </div>
                <ScreenStatus />
              </div>
              
              <div className="space-y-6">
                <LiveMetrics />
                <RecentActivity />
              </div>
            </div>
          </div>
        );
      
      case 'people':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">People Analytics</h1>
              <p className="text-gray-600 mt-2">Detailed insights into pedestrian traffic patterns</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                title="Peak Hour Traffic"
                value="1,247"
                change="6:00 PM - 7:00 PM"
                changeType="neutral"
                icon={Users}
                iconColor="bg-blue-500"
              />
              <StatsCard 
                title="Average Dwell Time"
                value="3.2 min"
                change="+15% vs last week"
                changeType="positive"
                icon={Calendar}
                iconColor="bg-green-500"
              />
              <StatsCard 
                title="Demographics Accuracy"
                value="91.4%"
                change="Age & gender detection"
                changeType="positive"
                icon={TrendingUp}
                iconColor="bg-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart 
                title="Hourly People Count"
                data={[
                  { label: '6AM', value: 45, color: '#3B82F6' },
                  { label: '9AM', value: 320, color: '#10B981' },
                  { label: '12PM', value: 480, color: '#F59E0B' },
                  { label: '3PM', value: 380, color: '#8B5CF6' },
                  { label: '6PM', value: 650, color: '#EF4444' },
                  { label: '9PM', value: 280, color: '#06B6D4' }
                ]}
                type="bar"
              />
              <Chart 
                title="Age Demographics"
                data={[
                  { label: '18-25', value: 340, color: '#3B82F6' },
                  { label: '26-35', value: 520, color: '#10B981' },
                  { label: '36-50', value: 380, color: '#F59E0B' },
                  { label: '50+', value: 180, color: '#8B5CF6' }
                ]}
                type="bar"
              />
            </div>
          </div>
        );

      case 'vehicles':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vehicle Analytics</h1>
              <p className="text-gray-600 mt-2">Traffic flow and vehicle classification insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                title="Peak Traffic Hour"
                value="8:30 AM"
                change="247 vehicles/hour"
                changeType="neutral"
                icon={Car}
                iconColor="bg-blue-500"
              />
              <StatsCard 
                title="Average Speed"
                value="52 km/h"
                change="+3 km/h vs last week"
                changeType="positive"
                icon={TrendingUp}
                iconColor="bg-green-500"
              />
              <StatsCard 
                title="Classification Rate"
                value="96.8%"
                change="Vehicle type accuracy"
                changeType="positive"
                icon={AlertTriangle}
                iconColor="bg-purple-500"
              />
            </div>

            <VehicleTypes />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart 
                title="Traffic Flow by Hour"
                data={[
                  { label: '6AM', value: 85, color: '#3B82F6' },
                  { label: '8AM', value: 247, color: '#EF4444' },
                  { label: '12PM', value: 180, color: '#F59E0B' },
                  { label: '5PM', value: 220, color: '#8B5CF6' },
                  { label: '8PM', value: 95, color: '#10B981' },
                  { label: '11PM', value: 35, color: '#06B6D4' }
                ]}
                type="bar"
              />
              <ScreenStatus />
            </div>
          </div>
        );

      case 'cameras':
        return <CameraManagement />;

      case 'taxi':
        return <TaxiAnalytics />;

      case 'screens':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LED Screen Management</h1>
              <p className="text-gray-600 mt-2">Monitor and manage your LED screen network</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {screenStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScreenMap />
              <div className="space-y-6">
                <ContentManagement />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ScreenHardware />
              <MaintenanceSchedule />
            </div>
          </div>
        );

      case 'alerts':
        return <Alerts />;

      case 'notifications':
        return <Notifications />;

      case 'settings':
        return <Settings />;

      case 'export':
        return <Export />;

      case 'security':
        return <Security />;

      case 'data':
        return <DataManagement />;

      case 'reports':
        return <Reports />;

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
            </h2>
            <p className="text-gray-600">This section is under development. More features coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;