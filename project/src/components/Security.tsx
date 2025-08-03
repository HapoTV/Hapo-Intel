import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Monitor, 
  Wifi, 
  Globe, 
  Database, 
  Activity, 
  Settings, 
  Bell, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  Edit3, 
  Plus, 
  Minus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Smartphone,
  Mail,
  MessageSquare,
  Zap,
  HardDrive,
  Camera,
  FileText,
  Archive,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_change' | 'data_access' | 'system_change' | 'alert' | 'breach_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  user: string;
  ipAddress: string;
  location?: string;
  device: string;
  description: string;
  details: Record<string, any>;
  status: 'active' | 'resolved' | 'investigating';
  assignedTo?: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'authentication' | 'authorization' | 'data' | 'network' | 'monitoring';
  rules: {
    condition: string;
    action: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }[];
  lastModified: string;
  modifiedBy: string;
}

interface UserSession {
  id: string;
  user: string;
  role: string;
  ipAddress: string;
  location: string;
  device: string;
  loginTime: string;
  lastActivity: string;
  status: 'active' | 'idle' | 'expired';
  permissions: string[];
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'breach_attempt',
    severity: 'critical',
    timestamp: '2025-01-08 10:45:00',
    user: 'Unknown',
    ipAddress: '192.168.1.100',
    location: 'Toronto, Canada',
    device: 'Unknown Browser',
    description: 'Multiple failed login attempts detected',
    details: { attempts: 15, timespan: '5 minutes', targetAccount: 'admin' },
    status: 'investigating',
    assignedTo: 'Security Team'
  },
  {
    id: '2',
    type: 'permission_change',
    severity: 'high',
    timestamp: '2025-01-08 09:30:00',
    user: 'admin',
    ipAddress: '192.168.1.50',
    location: 'Toronto, Canada',
    device: 'Chrome 120.0',
    description: 'User permissions modified for john.smith',
    details: { targetUser: 'john.smith', oldRole: 'viewer', newRole: 'admin' },
    status: 'resolved'
  },
  {
    id: '3',
    type: 'data_access',
    severity: 'medium',
    timestamp: '2025-01-08 08:15:00',
    user: 'jane.doe',
    ipAddress: '192.168.1.75',
    location: 'Toronto, Canada',
    device: 'Firefox 121.0',
    description: 'Bulk data export initiated',
    details: { exportType: 'analytics', recordCount: 50000, dateRange: '30 days' },
    status: 'active'
  },
  {
    id: '4',
    type: 'system_change',
    severity: 'medium',
    timestamp: '2025-01-08 07:22:00',
    user: 'system',
    ipAddress: '127.0.0.1',
    location: 'Local',
    device: 'System Process',
    description: 'Security policy updated',
    details: { policy: 'Password Policy', changes: ['minLength: 8 -> 12', 'requireSymbols: true'] },
    status: 'resolved'
  },
  {
    id: '5',
    type: 'failed_login',
    severity: 'low',
    timestamp: '2025-01-08 06:45:00',
    user: 'mike.chen',
    ipAddress: '192.168.1.120',
    location: 'Toronto, Canada',
    device: 'Safari 17.0',
    description: 'Failed login attempt',
    details: { reason: 'incorrect_password', attempts: 1 },
    status: 'resolved'
  }
];

const mockSecurityPolicies: SecurityPolicy[] = [
  {
    id: '1',
    name: 'Strong Password Policy',
    description: 'Enforces strong password requirements for all users',
    enabled: true,
    category: 'authentication',
    rules: [
      { condition: 'password_length < 12', action: 'reject', severity: 'medium' },
      { condition: 'no_uppercase', action: 'reject', severity: 'low' },
      { condition: 'no_symbols', action: 'reject', severity: 'medium' },
      { condition: 'common_password', action: 'reject', severity: 'high' }
    ],
    lastModified: '2025-01-08 07:22:00',
    modifiedBy: 'admin'
  },
  {
    id: '2',
    name: 'Failed Login Monitoring',
    description: 'Monitors and blocks suspicious login attempts',
    enabled: true,
    category: 'monitoring',
    rules: [
      { condition: 'failed_attempts > 5', action: 'lock_account', severity: 'high' },
      { condition: 'failed_attempts > 10', action: 'block_ip', severity: 'critical' },
      { condition: 'multiple_ips_same_user', action: 'alert', severity: 'medium' }
    ],
    lastModified: '2025-01-07 14:30:00',
    modifiedBy: 'security_admin'
  },
  {
    id: '3',
    name: 'Data Access Control',
    description: 'Controls access to sensitive analytics data',
    enabled: true,
    category: 'authorization',
    rules: [
      { condition: 'bulk_export > 10000_records', action: 'require_approval', severity: 'medium' },
      { condition: 'sensitive_data_access', action: 'log_audit', severity: 'low' },
      { condition: 'after_hours_access', action: 'alert', severity: 'medium' }
    ],
    lastModified: '2025-01-06 11:15:00',
    modifiedBy: 'data_admin'
  },
  {
    id: '4',
    name: 'Network Security',
    description: 'Monitors network traffic and connections',
    enabled: true,
    category: 'network',
    rules: [
      { condition: 'unknown_ip_range', action: 'block', severity: 'high' },
      { condition: 'suspicious_traffic_pattern', action: 'alert', severity: 'medium' },
      { condition: 'port_scan_detected', action: 'block_ip', severity: 'critical' }
    ],
    lastModified: '2025-01-05 16:45:00',
    modifiedBy: 'network_admin'
  }
];

const mockUserSessions: UserSession[] = [
  {
    id: '1',
    user: 'admin',
    role: 'Super Admin',
    ipAddress: '192.168.1.50',
    location: 'Toronto, Canada',
    device: 'Chrome 120.0 (Windows)',
    loginTime: '2025-01-08 08:30:00',
    lastActivity: '2025-01-08 10:45:00',
    status: 'active',
    permissions: ['all']
  },
  {
    id: '2',
    user: 'jane.doe',
    role: 'Analytics Manager',
    ipAddress: '192.168.1.75',
    location: 'Toronto, Canada',
    device: 'Firefox 121.0 (macOS)',
    loginTime: '2025-01-08 09:15:00',
    lastActivity: '2025-01-08 10:30:00',
    status: 'active',
    permissions: ['analytics_read', 'analytics_export', 'reports_create']
  },
  {
    id: '3',
    user: 'mike.chen',
    role: 'Operator',
    ipAddress: '192.168.1.120',
    location: 'Toronto, Canada',
    device: 'Safari 17.0 (iOS)',
    loginTime: '2025-01-08 07:45:00',
    lastActivity: '2025-01-08 09:20:00',
    status: 'idle',
    permissions: ['screens_view', 'alerts_view']
  },
  {
    id: '4',
    user: 'sarah.wilson',
    role: 'Maintenance Tech',
    ipAddress: '192.168.1.200',
    location: 'Toronto, Canada',
    device: 'Chrome 120.0 (Android)',
    loginTime: '2025-01-08 06:30:00',
    lastActivity: '2025-01-08 08:15:00',
    status: 'expired',
    permissions: ['maintenance_read', 'maintenance_write']
  }
];

export default function Security() {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'policies' | 'sessions' | 'settings'>('overview');
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>(mockSecurityPolicies);
  const [userSessions, setUserSessions] = useState<UserSession[]>(mockUserSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [filterType, setFilterType] = useState<'all' | 'login' | 'logout' | 'failed_login' | 'permission_change' | 'data_access' | 'system_change' | 'alert' | 'breach_attempt'>('all');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return <Lock className="w-4 h-4" />;
      case 'logout': return <Unlock className="w-4 h-4" />;
      case 'failed_login': return <XCircle className="w-4 h-4" />;
      case 'permission_change': return <Key className="w-4 h-4" />;
      case 'data_access': return <Database className="w-4 h-4" />;
      case 'system_change': return <Settings className="w-4 h-4" />;
      case 'alert': return <Bell className="w-4 h-4" />;
      case 'breach_attempt': return <Shield className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-amber-100 text-amber-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-amber-100 text-amber-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEventAction = (eventId: string, action: 'resolve' | 'investigate' | 'dismiss') => {
    setSecurityEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: action === 'resolve' ? 'resolved' : action === 'investigate' ? 'investigating' : 'resolved' }
        : event
    ));
  };

  const handleSessionAction = (sessionId: string, action: 'terminate' | 'extend') => {
    if (action === 'terminate') {
      setUserSessions(prev => prev.map(session => 
        session.id === sessionId ? { ...session, status: 'expired' } : session
      ));
    }
  };

  const togglePolicy = (policyId: string) => {
    setSecurityPolicies(prev => prev.map(policy => 
      policy.id === policyId ? { ...policy, enabled: !policy.enabled } : policy
    ));
  };

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ipAddress.includes(searchTerm);
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const criticalEvents = securityEvents.filter(e => e.severity === 'critical' && e.status === 'active').length;
  const highEvents = securityEvents.filter(e => e.severity === 'high' && e.status === 'active').length;
  const activeSessions = userSessions.filter(s => s.status === 'active').length;
  const enabledPolicies = securityPolicies.filter(p => p.enabled).length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{criticalEvents}</p>
              <p className="text-sm text-gray-600">Critical Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{highEvents}</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeSessions}</p>
              <p className="text-sm text-gray-600">Active Sessions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{enabledPolicies}</p>
              <p className="text-sm text-gray-600">Active Policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Critical Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Critical Events</h3>
        <div className="space-y-4">
          {securityEvents
            .filter(event => event.severity === 'critical' || event.severity === 'high')
            .slice(0, 5)
            .map((event) => (
            <div key={event.id} className={`border rounded-lg p-4 ${getSeverityColor(event.severity)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(event.severity)}
                  {getEventTypeIcon(event.type)}
                  <div>
                    <h4 className="font-semibold">{event.description}</h4>
                    <div className="flex items-center space-x-4 text-sm mt-1">
                      <span>User: {event.user}</span>
                      <span>IP: {event.ipAddress}</span>
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Health Score</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Password Policy Compliance</span>
              <span className="text-sm font-bold text-green-600">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
              <span className="text-sm font-bold text-amber-600">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Network Security</span>
              <span className="text-sm font-bold text-green-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Data Encryption</span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active User Sessions</h3>
          <div className="space-y-3">
            {userSessions.filter(s => s.status === 'active').map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.user}</p>
                  <p className="text-sm text-gray-600">{session.role} • {session.ipAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{session.lastActivity.split(' ')[1]}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="breach_attempt">Breach Attempts</option>
              <option value="failed_login">Failed Logins</option>
              <option value="permission_change">Permission Changes</option>
              <option value="data_access">Data Access</option>
              <option value="system_change">System Changes</option>
            </select>
          </div>
        </div>

        {selectedEvents.length > 0 && (
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-sm text-gray-600">{selectedEvents.length} selected</span>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200">
              Mark Resolved
            </button>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200">
              Investigate
            </button>
            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200">
              Archive
            </button>
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Security Events ({filteredEvents.length})
          </h3>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className={`border rounded-lg p-4 ${getSeverityColor(event.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEvents([...selectedEvents, event.id]);
                        } else {
                          setSelectedEvents(selectedEvents.filter(id => id !== event.id));
                        }
                      }}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getSeverityIcon(event.severity)}
                        {getEventTypeIcon(event.type)}
                        <h4 className="font-semibold">{event.description}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">User:</span>
                          <span className="ml-1 font-medium">{event.user}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">IP:</span>
                          <span className="ml-1 font-medium">{event.ipAddress}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Device:</span>
                          <span className="ml-1 font-medium">{event.device}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time:</span>
                          <span className="ml-1 font-medium">{event.timestamp}</span>
                        </div>
                      </div>
                      {Object.keys(event.details).length > 0 && (
                        <div className="bg-white bg-opacity-50 rounded p-2 text-sm">
                          <strong>Details:</strong>
                          {Object.entries(event.details).map(([key, value]) => (
                            <span key={key} className="ml-2">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    {event.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleEventAction(event.id, 'investigate')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
                        >
                          Investigate
                        </button>
                        <button
                          onClick={() => handleEventAction(event.id, 'resolve')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                        >
                          Resolve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Security Policies</h3>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add Policy</span>
          </button>
        </div>

        <div className="space-y-4">
          {securityPolicies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={policy.enabled}
                      onChange={() => togglePolicy(policy.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <div>
                    <h4 className="font-semibold text-gray-900">{policy.name}</h4>
                    <p className="text-sm text-gray-600">{policy.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    policy.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {policy.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Rules:</h5>
                {policy.rules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <span className="text-gray-700">{rule.condition}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">→ {rule.action}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                        {rule.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span>Category: {policy.category}</span>
                <span>Modified: {policy.lastModified} by {policy.modifiedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active User Sessions</h3>
          <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200">
            <XCircle className="w-4 h-4" />
            <span>Terminate All</span>
          </button>
        </div>

        <div className="space-y-4">
          {userSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{session.user}</h4>
                    <p className="text-sm text-gray-600">{session.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                  {session.status === 'active' && (
                    <button
                      onClick={() => handleSessionAction(session.id, 'terminate')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                    >
                      Terminate
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                <div>
                  <span className="text-gray-500">IP Address:</span>
                  <p className="font-medium">{session.ipAddress}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">{session.location}</p>
                </div>
                <div>
                  <span className="text-gray-500">Device:</span>
                  <p className="font-medium">{session.device}</p>
                </div>
                <div>
                  <span className="text-gray-500">Login Time:</span>
                  <p className="font-medium">{session.loginTime}</p>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-gray-500 text-sm">Permissions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {session.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
        <p className="text-gray-600 mt-2">Monitor and manage system security, user access, and threat detection</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: Shield },
            { id: 'events', name: 'Security Events', icon: Activity },
            { id: 'policies', name: 'Policies', icon: FileText },
            { id: 'sessions', name: 'User Sessions', icon: Users },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'policies' && renderPolicies()}
      {activeTab === 'sessions' && renderSessions()}
      {activeTab === 'settings' && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
          <p className="text-gray-600">Advanced security configuration options coming soon.</p>
        </div>
      )}
    </div>
  );
}