import React from 'react';
import { 
  BarChart3, 
  Users, 
  Car, 
  Monitor, 
  AlertTriangle, 
  Settings, 
  Calendar,
  Bell,
  Shield,
  Database,
  Download,
  Camera
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'people', label: 'People Analytics', icon: Users },
  { id: 'vehicles', label: 'Vehicle Analytics', icon: Car },
  { id: 'taxi', label: 'Taxi Analytics', icon: Car },
  { id: 'cameras', label: 'Camera Management', icon: Camera },
  { id: 'screens', label: 'LED Screens', icon: Monitor },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'reports', label: 'Reports', icon: Calendar },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'data', label: 'Data Management', icon: Database },
  { id: 'export', label: 'Export', icon: Download },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Hapo Intel</h1>
            <p className="text-sm text-gray-400">AI Analytics</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-800">
        <div className="text-xs text-gray-400">
          <p>Version 2.1.0</p>
          <p>© 2025 Hapo Group</p>
        </div>
      </div>
    </div>
  );
}