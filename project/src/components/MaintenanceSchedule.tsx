import React from 'react';
import { Calendar, Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const maintenanceSchedule = [
  {
    id: 1,
    screenName: 'Mall Plaza - Main Entrance',
    type: 'Routine Cleaning',
    scheduledDate: '2025-01-15',
    priority: 'low',
    status: 'scheduled',
    technician: 'John Smith',
    estimatedDuration: '2 hours'
  },
  {
    id: 2,
    screenName: 'Sports Center - Parking',
    type: 'Hardware Inspection',
    scheduledDate: '2025-01-10',
    priority: 'high',
    status: 'overdue',
    technician: 'Sarah Johnson',
    estimatedDuration: '4 hours'
  },
  {
    id: 3,
    screenName: 'Highway 401 - North Bound',
    type: 'Software Update',
    scheduledDate: '2025-01-08',
    priority: 'medium',
    status: 'in-progress',
    technician: 'Mike Chen',
    estimatedDuration: '1 hour'
  },
  {
    id: 4,
    screenName: 'Airport Terminal - Arrivals',
    type: 'Calibration Check',
    scheduledDate: '2025-01-05',
    priority: 'low',
    status: 'completed',
    technician: 'Lisa Wong',
    estimatedDuration: '3 hours'
  }
];

export default function MaintenanceSchedule() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'scheduled': return <Calendar className="w-5 h-5 text-gray-500" />;
      default: return <Wrench className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Maintenance Schedule</h3>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Calendar className="w-4 h-4" />
          <span>Schedule Maintenance</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {maintenanceSchedule.map((maintenance) => (
          <div key={maintenance.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(maintenance.status)}
                <div>
                  <h4 className="font-semibold text-gray-900">{maintenance.screenName}</h4>
                  <p className="text-sm text-gray-600">{maintenance.type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(maintenance.priority)}`}>
                  {maintenance.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(maintenance.status)}`}>
                  {maintenance.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Scheduled Date</p>
                <p className="font-medium text-gray-900">{maintenance.scheduledDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Technician</p>
                <p className="font-medium text-gray-900">{maintenance.technician}</p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">{maintenance.estimatedDuration}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors duration-200">
                  Edit
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}