import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Slack, 
  Settings, 
  Users, 
  Car, 
  Monitor, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Star,
  StarOff,
  Filter,
  Search,
  Send,
  Plus,
  Edit3,
  X,
  Volume2,
  VolumeX,
  Zap,
  Calendar,
  Globe,
  Wifi,
  Database,
  Activity
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'system' | 'maintenance' | 'update' | 'security' | 'report';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  priority: 'high' | 'medium' | 'low';
  channel: 'email' | 'sms' | 'push' | 'slack' | 'webhook';
  source: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'slack' | 'webhook';
  enabled: boolean;
  config: Record<string, any>;
  icon: React.ComponentType<any>;
}

interface NotificationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: {
    type: string[];
    priority: string[];
    source: string[];
  };
  channels: string[];
  schedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    days: string[];
  };
  throttling: {
    enabled: boolean;
    maxPerHour: number;
    cooldownMinutes: number;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Critical System Alert',
    message: 'LED Screen at Mall Plaza has gone offline. Immediate attention required.',
    timestamp: '2025-01-08 10:45:00',
    read: false,
    starred: true,
    priority: 'high',
    channel: 'email',
    source: 'System Monitor',
    actionUrl: '/screens'
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'Scheduled Maintenance Reminder',
    message: 'Routine maintenance for Highway 401 screen is due tomorrow at 9:00 AM.',
    timestamp: '2025-01-08 09:30:00',
    read: true,
    starred: false,
    priority: 'medium',
    channel: 'email',
    source: 'Maintenance Scheduler'
  },
  {
    id: '3',
    type: 'system',
    title: 'Software Update Available',
    message: 'New firmware version 2.1.3 is available for all LED screens.',
    timestamp: '2025-01-08 08:15:00',
    read: false,
    starred: false,
    priority: 'low',
    channel: 'push',
    source: 'Update Manager'
  },
  {
    id: '4',
    type: 'security',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100.',
    timestamp: '2025-01-08 07:22:00',
    read: true,
    starred: true,
    priority: 'high',
    channel: 'sms',
    source: 'Security Monitor'
  },
  {
    id: '5',
    type: 'report',
    title: 'Weekly Analytics Report Ready',
    message: 'Your weekly people and vehicle analytics report is ready for download.',
    timestamp: '2025-01-08 06:00:00',
    read: false,
    starred: false,
    priority: 'low',
    channel: 'email',
    source: 'Report Generator'
  }
];

const notificationChannels: NotificationChannel[] = [
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    enabled: true,
    config: { address: 'admin@hapogroup.com', smtp: 'configured' },
    icon: Mail
  },
  {
    id: 'sms',
    name: 'SMS',
    type: 'sms',
    enabled: true,
    config: { phone: '+1-555-0123', provider: 'Twilio' },
    icon: Smartphone
  },
  {
    id: 'push',
    name: 'Push Notifications',
    type: 'push',
    enabled: true,
    config: { service: 'Firebase', tokens: 3 },
    icon: Bell
  },
  {
    id: 'slack',
    name: 'Slack',
    type: 'slack',
    enabled: false,
    config: { webhook: '', channel: '#alerts' },
    icon: MessageSquare
  },
  {
    id: 'webhook',
    name: 'Custom Webhook',
    type: 'webhook',
    enabled: false,
    config: { url: '', method: 'POST' },
    icon: Globe
  }
];

const notificationRules: NotificationRule[] = [
  {
    id: '1',
    name: 'Critical Alerts',
    description: 'Immediate notification for critical system alerts',
    enabled: true,
    conditions: {
      type: ['alert'],
      priority: ['high'],
      source: ['System Monitor', 'Security Monitor']
    },
    channels: ['email', 'sms', 'push'],
    schedule: {
      enabled: false,
      startTime: '09:00',
      endTime: '17:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    throttling: {
      enabled: false,
      maxPerHour: 10,
      cooldownMinutes: 5
    }
  },
  {
    id: '2',
    name: 'Maintenance Reminders',
    description: 'Notifications for scheduled maintenance and updates',
    enabled: true,
    conditions: {
      type: ['maintenance', 'update'],
      priority: ['medium', 'low'],
      source: ['Maintenance Scheduler', 'Update Manager']
    },
    channels: ['email'],
    schedule: {
      enabled: true,
      startTime: '08:00',
      endTime: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    throttling: {
      enabled: true,
      maxPerHour: 5,
      cooldownMinutes: 30
    }
  },
  {
    id: '3',
    name: 'Weekly Reports',
    description: 'Automated weekly analytics and performance reports',
    enabled: true,
    conditions: {
      type: ['report'],
      priority: ['low'],
      source: ['Report Generator']
    },
    channels: ['email'],
    schedule: {
      enabled: true,
      startTime: '06:00',
      endTime: '08:00',
      days: ['monday']
    },
    throttling: {
      enabled: false,
      maxPerHour: 1,
      cooldownMinutes: 60
    }
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(mockNotifications);
  const [channels, setChannels] = useState<NotificationChannel[]>(notificationChannels);
  const [rules, setRules] = useState<NotificationRule[]>(notificationRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'alert' | 'system' | 'maintenance' | 'update' | 'security' | 'report'>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showChannels, setShowChannels] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [globalNotifications, setGlobalNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || notification.type === filterType;
      const matchesRead = filterRead === 'all' || 
                         (filterRead === 'read' && notification.read) ||
                         (filterRead === 'unread' && !notification.read);
      const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
      
      return matchesSearch && matchesType && matchesRead && matchesPriority;
    });

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, filterType, filterRead, filterPriority]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'update': return <Zap className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'report': return <Activity className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-100 text-red-800';
      case 'system': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-amber-100 text-amber-800';
      case 'update': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'report': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNotificationAction = (notificationId: string, action: 'read' | 'unread' | 'star' | 'unstar' | 'delete') => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === notificationId) {
        switch (action) {
          case 'read':
            return { ...notification, read: true };
          case 'unread':
            return { ...notification, read: false };
          case 'star':
            return { ...notification, starred: true };
          case 'unstar':
            return { ...notification, starred: false };
          default:
            return notification;
        }
      }
      return notification;
    }));

    if (action === 'delete') {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'delete') => {
    if (action === 'delete') {
      setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    } else {
      setNotifications(prev => prev.map(notification => {
        if (selectedNotifications.includes(notification.id)) {
          switch (action) {
            case 'read':
              return { ...notification, read: true };
            case 'unread':
              return { ...notification, read: false };
            case 'star':
              return { ...notification, starred: true };
            default:
              return notification;
          }
        }
        return notification;
      }));
    }
    setSelectedNotifications([]);
  };

  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const starredCount = notifications.filter(n => n.starred).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Manage your notification preferences and history</p>
      </div>

      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Mail className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{starredCount}</p>
              <p className="text-sm text-gray-600">Starred</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{channels.filter(c => c.enabled).length}</p>
              <p className="text-sm text-gray-600">Active Channels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Settings</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={globalNotifications}
                onChange={(e) => setGlobalNotifications(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                {globalNotifications ? <Bell className="w-4 h-4 text-blue-600" /> : <BellOff className="w-4 h-4 text-gray-400" />}
                <span className="font-medium text-gray-900">Enable Notifications</span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                <span className="font-medium text-gray-900">Sound Alerts</span>
              </div>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowChannels(!showChannels)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Channels</span>
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Rules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Channels */}
      {showChannels && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
            <button
              onClick={() => setShowChannels(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${channel.enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${channel.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{channel.type}</p>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={channel.enabled}
                        onChange={() => toggleChannel(channel.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    {Object.entries(channel.config).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors duration-200">
                    Configure
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notification Rules */}
      {showRules && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notification Rules</h3>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Rule</span>
              </button>
              <button
                onClick={() => setShowRules(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={() => toggleRule(rule.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Enabled</span>
                    </label>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Conditions</p>
                    <div className="space-y-1">
                      <p>Types: {rule.conditions.type.join(', ')}</p>
                      <p>Priority: {rule.conditions.priority.join(', ')}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Channels</p>
                    <p>{rule.channels.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Schedule</p>
                    <p>{rule.schedule.enabled ? `${rule.schedule.startTime} - ${rule.schedule.endTime}` : 'Always'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
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
              <option value="alert">Alerts</option>
              <option value="system">System</option>
              <option value="maintenance">Maintenance</option>
              <option value="update">Updates</option>
              <option value="security">Security</option>
              <option value="report">Reports</option>
            </select>

            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {selectedNotifications.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-gray-600">{selectedNotifications.length} selected</span>
            <button
              onClick={() => handleBulkAction('read')}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
            >
              Mark Read
            </button>
            <button
              onClick={() => handleBulkAction('unread')}
              className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors duration-200"
            >
              Mark Unread
            </button>
            <button
              onClick={() => handleBulkAction('star')}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors duration-200"
            >
              Star
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications ({filteredNotifications.length})
          </h3>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                  notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNotifications([...selectedNotifications, notification.id]);
                      } else {
                        setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getTypeIcon(notification.type)}
                      <h4 className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                        {notification.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      {notification.starred && (
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{notification.message}</p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Send className="w-3 h-3" />
                        <span className="capitalize">{notification.channel}</span>
                      </div>
                      <span>From: {notification.source}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleNotificationAction(notification.id, notification.read ? 'unread' : 'read')}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      title={notification.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {notification.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleNotificationAction(notification.id, notification.starred ? 'unstar' : 'star')}
                      className="p-1 text-gray-400 hover:text-amber-600 transition-colors duration-200"
                      title={notification.starred ? 'Remove star' : 'Add star'}
                    >
                      {notification.starred ? <Star className="w-4 h-4 fill-current text-amber-500" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleNotificationAction(notification.id, 'delete')}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">No notifications match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}