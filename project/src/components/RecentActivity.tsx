import React from 'react';
import { Clock, Users, Car, AlertTriangle, CheckCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'detection',
    message: 'High foot traffic detected at Mall Plaza LED',
    time: '2 minutes ago',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'vehicle',
    message: 'Peak vehicle activity on Highway 401 screen',
    time: '5 minutes ago',
    icon: Car,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'maintenance',
    message: 'Screen calibration completed - Downtown Location',
    time: '12 minutes ago',
    icon: CheckCircle,
    color: 'text-emerald-500'
  },
  {
    id: 4,
    type: 'alert',
    message: 'Low detection accuracy at Sports Center',
    time: '18 minutes ago',
    icon: AlertTriangle,
    color: 'text-amber-500'
  },
  {
    id: 5,
    type: 'detection',
    message: 'New daily record: 15,847 people detected',
    time: '1 hour ago',
    icon: Users,
    color: 'text-purple-500'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.message}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}