import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Bell, 
  BellOff,
  Filter,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Settings,
  Users,
  Car,
  Monitor,
  Wifi,
  Thermometer,
  Zap,
  HardDrive,
  Camera,
  Shield,
  RefreshCw,
  Download,
  Archive,
  Star,
  MessageSquare,
  MapPin,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'system' | 'security' | 'performance' | 'maintenance' | 'detection' | 'network';
  title: string;
  description: string;
  location?: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  priority: 'high' | 'medium' | 'low';
  source: string;
  affectedDevices?: string[];
  actionRequired: boolean;
  autoResolve: boolean;
  escalated: boolean;
  assignedTo?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  notes?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    category: 'system',
    title: 'LED Screen Offline',
    description: 'Mall Plaza - Main Entrance screen has been offline for 15 minutes',
    location: 'Mall Plaza - Main Entrance',
    timestamp: '2025-01-08 10:45:00',
    status: 'active',
    priority: 'high',
    source: 'Screen Monitor',
    affectedDevices: ['LED-001'],
    actionRequired: true,
    autoResolve: false,
    escalated: true
  },
  {
    id: '2',
    type: 'warning',
    category: 'performance',
    title: 'High Temperature Alert',
    description: 'Sports Center screen temperature exceeds normal operating range (58°C)',
    location: 'Sports Center - Parking',
    timestamp: '2025-01-08 10:30:00',
    status: 'acknowledged',
    priority: 'medium',
    source: 'Hardware Monitor',
    affectedDevices: ['LED-003'],
    actionRequired: true,
    autoResolve: false,
    escalated: false,
    assignedTo: 'John Smith'
  },
  {
    id: '3',
    type: 'warning',
    category: 'detection',
    title: 'Low Detection Accuracy',
    description: 'People detection accuracy dropped to 76% at Highway 401 location',
    location: 'Highway 401 - North Bound',
    timestamp: '2025-01-08 09:15:00',
    status: 'active',
    priority: 'medium',
    source: 'AI Analytics',
    affectedDevices: ['CAM-002'],
    actionRequired: false,
    autoResolve: true,
    escalated: false
  },
  {
    id: '4',
    type: 'info',
    category: 'maintenance',
    title: 'Scheduled Maintenance Due',
    description: 'Routine maintenance scheduled for Airport Terminal screen',
    location: 'Airport Terminal - Arrivals',
    timestamp: '2025-01-08 08:00:00',
    status: 'active',
    priority: 'low',
    source: 'Maintenance Scheduler',
    affectedDevices: ['LED-005'],
    actionRequired: true,
    autoResolve: false,
    escalated: false
  },
  {
    id: '5',
    type: 'success',
    category: 'system',
    title: 'System Update Completed',
    description: 'Software update successfully applied to all LED screens',
    timestamp: '2025-01-08 07:30:00',
    status: 'resolved',
    priority: 'low',
    source: 'System Manager',
    actionRequired: false,
    autoResolve: true,
    escalated: false,
    resolvedBy: 'System',
    resolvedAt: '2025-01-08 07:35:00'
  },
  {
    id: '6',
    type: 'critical',
    category: 'security',
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: '2025-01-08 06:45:00',
    status: 'acknowledged',
    priority: 'high',
    source: 'Security Monitor',
    actionRequired: true,
    autoResolve: false,
    escalated: true,
    assignedTo: 'Security Team'
  }
];

const alertRules = [
  {
    id: '1',
    name: 'Screen Offline Detection',
    category: 'system',
    condition: 'Screen offline > 5 minutes',
    severity: 'critical',
    enabled: true,
    autoEscalate: true,
    escalateAfter: '15 minutes',
    notifyChannels: ['email', 'sms', 'dashboard']
  },
  {
    id: '2',
    name: 'High Temperature Warning',
    category: 'performance',
    condition: 'Temperature > 50°C',
    severity: 'warning',
    enabled: true,
    autoEscalate: false,
    notifyChannels: ['email', 'dashboard']
  },
  {
    id: '3',
    name: 'Low Detection Accuracy',
    category: 'detection',
    condition: 'Accuracy < 80%',
    severity: 'warning',
    enabled: true,
    autoEscalate: false,
    notifyChannels: ['dashboard']
  },
  {
    id: '4',
    name: 'Security Breach Attempt',
    category: 'security',
    condition: 'Failed logins > 5 in 10 minutes',
    severity: 'critical',
    enabled: true,
    autoEscalate: true,
    escalateAfter: '5 minutes',
    notifyChannels: ['email', 'sms', 'dashboard', 'slack']
  }
];

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info' | 'success'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'acknowledged' | 'resolved' | 'dismissed'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'system' | 'security' | 'performance' | 'maintenance' | 'detection' | 'network'>('all');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sortBy, setSortBy] = useState<'timestamp' | 'priority' | 'type'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    let filtered = alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (alert.location && alert.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || alert.type === filterType;
      const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || alert.category === filterCategory;
      
      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });

    // Sort alerts
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'type':
          const typeOrder = { critical: 4, warning: 3, info: 2, success: 1 };
          comparison = typeOrder[a.type] - typeOrder[b.type];
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredAlerts(filtered);
  }, [alerts, searchTerm, filterType, filterStatus, filterCategory, sortBy, sortOrder]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'info': return <AlertCircle className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return <Monitor className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Activity className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'detection': return <Camera className="w-4 h-4" />;
      case 'network': return <Wifi className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'resolve' | 'dismiss') => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          status: action === 'acknowledge' ? 'acknowledged' : action === 'resolve' ? 'resolved' : 'dismissed',
          resolvedBy: action === 'resolve' ? 'Current User' : undefined,
          resolvedAt: action === 'resolve' ? new Date().toISOString().slice(0, 19).replace('T', ' ') : undefined
        };
      }
      return alert;
    }));
  };

  const handleBulkAction = (action: 'acknowledge' | 'resolve' | 'dismiss' | 'delete') => {
    if (action === 'delete') {
      setAlerts(prev => prev.filter(alert => !selectedAlerts.includes(alert.id)));
    } else {
      setAlerts(prev => prev.map(alert => {
        if (selectedAlerts.includes(alert.id)) {
          return {
            ...alert,
            status: action === 'acknowledge' ? 'acknowledged' : action === 'resolve' ? 'resolved' : 'dismissed',
            resolvedBy: action === 'resolve' ? 'Current User' : undefined,
            resolvedAt: action === 'resolve' ? new Date().toISOString().slice(0, 19).replace('T', ' ') : undefined
          };
        }
        return alert;
      }));
    }
    setSelectedAlerts([]);
  };

  const activeAlertsCount = alerts.filter(alert => alert.status === 'active').length;
  const criticalAlertsCount = alerts.filter(alert => alert.type === 'critical' && alert.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alert Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage system alerts and notifications</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeAlertsCount}</p>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{criticalAlertsCount}</p>
              <p className="text-sm text-gray-600">Critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{alerts.filter(a => a.status === 'acknowledged').length}</p>
              <p className="text-sm text-gray-600">Acknowledged</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{alerts.filter(a => a.status === 'resolved').length}</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="maintenance">Maintenance</option>
              <option value="detection">Detection</option>
              <option value="network">Network</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="timestamp">Time</option>
              <option value="priority">Priority</option>
              <option value="type">Type</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <TrendingUp className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform duration-200`} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {selectedAlerts.length > 0 && (
              <div className="flex items-center space-x-2 mr-4">
                <span className="text-sm text-gray-600">{selectedAlerts.length} selected</span>
                <button
                  onClick={() => handleBulkAction('acknowledge')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => handleBulkAction('resolve')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            )}

            <button
              onClick={() => setShowRules(!showRules)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Alert Rules</span>
            </button>

            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Rules Panel */}
      {showRules && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alert Rules</h3>
            <button
              onClick={() => setShowRules(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {alertRules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(rule.category)}
                    <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Enabled</span>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rule.condition}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Channels: {rule.notifyChannels.join(', ')}</span>
                  {rule.autoEscalate && <span>Auto-escalate: {rule.escalateAfter}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Alerts ({filteredAlerts.length})
            </h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAlerts([...selectedAlerts, alert.id]);
                        } else {
                          setSelectedAlerts(selectedAlerts.filter(id => id !== alert.id));
                        }
                      }}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getAlertIcon(alert.type)}
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        {alert.escalated && (
                          <Star className="w-4 h-4 text-amber-500" title="Escalated" />
                        )}
                        {alert.actionRequired && (
                          <Bell className="w-4 h-4 text-red-500" title="Action Required" />
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{alert.description}</p>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(alert.category)}
                          <span className="text-gray-600">{alert.category}</span>
                        </div>
                        
                        {alert.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{alert.location}</span>
                          </div>
                        )}

                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{alert.timestamp}</span>
                        </div>

                        <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>

                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                          alert.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.priority} priority
                        </span>

                        {alert.assignedTo && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">Assigned to: {alert.assignedTo}</span>
                          </div>
                        )}
                      </div>

                      {alert.resolvedBy && (
                        <div className="mt-2 text-xs text-green-600">
                          Resolved by {alert.resolvedBy} at {alert.resolvedAt}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {alert.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
                        >
                          Acknowledge
                        </button>
                        <button
                          onClick={() => handleAlertAction(alert.id, 'resolve')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                        >
                          Resolve
                        </button>
                      </>
                    )}
                    
                    {alert.status === 'acknowledged' && (
                      <button
                        onClick={() => handleAlertAction(alert.id, 'resolve')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                      >
                        Resolve
                      </button>
                    )}

                    <button
                      onClick={() => handleAlertAction(alert.id, 'dismiss')}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">All systems are running smoothly or no alerts match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}