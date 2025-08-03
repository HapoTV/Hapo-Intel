import React, { useState } from 'react';
import { 
  Database, 
  HardDrive, 
  Archive, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  Settings, 
  Calendar, 
  Clock, 
  BarChart3, 
  Users, 
  Car, 
  Monitor, 
  Camera, 
  FileText, 
  Image, 
  Video, 
  Folder, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Copy, 
  Share2, 
  Lock, 
  Unlock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Minus,
  Cloud,
  Server,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  PieChart,
  Globe,
  Shield,
  Key
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'analytics' | 'media' | 'logs' | 'system' | 'backup';
  status: 'active' | 'inactive' | 'error' | 'syncing';
  size: string;
  records: number;
  lastUpdated: string;
  retention: number; // days
  location: 'local' | 'cloud' | 'hybrid';
  encrypted: boolean;
  compressed: boolean;
  description: string;
}

interface BackupJob {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime?: string;
  endTime?: string;
  size?: string;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    enabled: boolean;
  };
  retention: number;
  destination: 'local' | 'cloud' | 'both';
}

interface DataPolicy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'retention' | 'backup' | 'archival' | 'deletion' | 'encryption';
  rules: {
    condition: string;
    action: string;
    schedule?: string;
  }[];
  lastModified: string;
  appliesTo: string[];
}

const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'People Analytics Data',
    type: 'analytics',
    status: 'active',
    size: '2.4 GB',
    records: 1247893,
    lastUpdated: '2025-01-08 10:45:00',
    retention: 90,
    location: 'hybrid',
    encrypted: true,
    compressed: true,
    description: 'People detection and demographic analytics data'
  },
  {
    id: '2',
    name: 'Vehicle Traffic Data',
    type: 'analytics',
    status: 'active',
    size: '1.8 GB',
    records: 892456,
    lastUpdated: '2025-01-08 10:30:00',
    retention: 90,
    location: 'local',
    encrypted: true,
    compressed: true,
    description: 'Vehicle detection and traffic flow analytics'
  },
  {
    id: '3',
    name: 'Media Content Library',
    type: 'media',
    status: 'active',
    size: '15.2 GB',
    records: 3456,
    lastUpdated: '2025-01-08 09:15:00',
    retention: 365,
    location: 'cloud',
    encrypted: false,
    compressed: true,
    description: 'Uploaded images, videos, and content files'
  },
  {
    id: '4',
    name: 'System Logs',
    type: 'logs',
    status: 'active',
    size: '892 MB',
    records: 2847392,
    lastUpdated: '2025-01-08 10:45:00',
    retention: 30,
    location: 'local',
    encrypted: true,
    compressed: true,
    description: 'Application and system log files'
  },
  {
    id: '5',
    name: 'Configuration Backup',
    type: 'backup',
    status: 'syncing',
    size: '124 MB',
    records: 1,
    lastUpdated: '2025-01-08 02:00:00',
    retention: 180,
    location: 'cloud',
    encrypted: true,
    compressed: true,
    description: 'System configuration and settings backup'
  }
];

const mockBackupJobs: BackupJob[] = [
  {
    id: '1',
    name: 'Daily Analytics Backup',
    type: 'incremental',
    status: 'completed',
    progress: 100,
    startTime: '2025-01-08 02:00:00',
    endTime: '2025-01-08 02:15:00',
    size: '245 MB',
    schedule: { frequency: 'daily', time: '02:00', enabled: true },
    retention: 30,
    destination: 'cloud'
  },
  {
    id: '2',
    name: 'Weekly Full Backup',
    type: 'full',
    status: 'scheduled',
    progress: 0,
    schedule: { frequency: 'weekly', time: '01:00', enabled: true },
    retention: 90,
    destination: 'both'
  },
  {
    id: '3',
    name: 'Media Content Backup',
    type: 'differential',
    status: 'running',
    progress: 65,
    startTime: '2025-01-08 10:30:00',
    schedule: { frequency: 'daily', time: '10:30', enabled: true },
    retention: 60,
    destination: 'cloud'
  }
];

const mockDataPolicies: DataPolicy[] = [
  {
    id: '1',
    name: 'Analytics Data Retention',
    description: 'Automatically archive analytics data older than 90 days',
    enabled: true,
    type: 'retention',
    rules: [
      { condition: 'age > 90 days', action: 'archive_to_cold_storage' },
      { condition: 'age > 365 days', action: 'delete_permanently' }
    ],
    lastModified: '2025-01-07 14:30:00',
    appliesTo: ['analytics']
  },
  {
    id: '2',
    name: 'Media Content Archival',
    description: 'Archive unused media content to reduce storage costs',
    enabled: true,
    type: 'archival',
    rules: [
      { condition: 'unused > 180 days', action: 'move_to_archive' },
      { condition: 'size > 100MB AND unused > 30 days', action: 'compress_and_archive' }
    ],
    lastModified: '2025-01-06 11:15:00',
    appliesTo: ['media']
  },
  {
    id: '3',
    name: 'Log File Cleanup',
    description: 'Automatically clean up old log files to maintain performance',
    enabled: true,
    type: 'deletion',
    rules: [
      { condition: 'age > 30 days', action: 'delete', schedule: 'daily_at_midnight' },
      { condition: 'size > 1GB', action: 'compress_and_keep_7_days' }
    ],
    lastModified: '2025-01-05 16:45:00',
    appliesTo: ['logs']
  },
  {
    id: '4',
    name: 'Sensitive Data Encryption',
    description: 'Ensure all sensitive data is encrypted at rest and in transit',
    enabled: true,
    type: 'encryption',
    rules: [
      { condition: 'contains_pii = true', action: 'encrypt_aes256' },
      { condition: 'type = analytics', action: 'encrypt_and_backup' }
    ],
    lastModified: '2025-01-04 09:20:00',
    appliesTo: ['analytics', 'logs', 'backup']
  }
];

export default function DataManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'backups' | 'policies' | 'storage'>('overview');
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>(mockBackupJobs);
  const [dataPolicies, setDataPolicies] = useState<DataPolicy[]>(mockDataPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'analytics' | 'media' | 'logs' | 'system' | 'backup'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'error' | 'syncing'>('all');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'running': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'media': return <Image className="w-4 h-4" />;
      case 'logs': return <FileText className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'backup': return <Archive className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'local': return <Server className="w-4 h-4" />;
      case 'cloud': return <Cloud className="w-4 h-4" />;
      case 'hybrid': return <Globe className="w-4 h-4" />;
      default: return <HardDrive className="w-4 h-4" />;
    }
  };

  const handleSourceAction = (sourceId: string, action: 'sync' | 'archive' | 'delete' | 'encrypt') => {
    setDataSources(prev => prev.map(source => {
      if (source.id === sourceId) {
        switch (action) {
          case 'sync':
            return { ...source, status: 'syncing' };
          case 'encrypt':
            return { ...source, encrypted: true };
          default:
            return source;
        }
      }
      return source;
    }));
  };

  const handleBackupAction = (jobId: string, action: 'start' | 'stop' | 'delete') => {
    setBackupJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        switch (action) {
          case 'start':
            return { ...job, status: 'running', progress: 0, startTime: new Date().toISOString().slice(0, 19).replace('T', ' ') };
          case 'stop':
            return { ...job, status: 'scheduled', progress: 0 };
          default:
            return job;
        }
      }
      return job;
    }));
  };

  const togglePolicy = (policyId: string) => {
    setDataPolicies(prev => prev.map(policy => 
      policy.id === policyId ? { ...policy, enabled: !policy.enabled } : policy
    ));
  };

  const filteredSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || source.type === filterType;
    const matchesStatus = filterStatus === 'all' || source.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalSize = dataSources.reduce((sum, source) => {
    const size = parseFloat(source.size.split(' ')[0]);
    const unit = source.size.split(' ')[1];
    const multiplier = unit === 'GB' ? 1024 : unit === 'TB' ? 1024 * 1024 : 1;
    return sum + (size * multiplier);
  }, 0);

  const totalRecords = dataSources.reduce((sum, source) => sum + source.records, 0);
  const activeSources = dataSources.filter(s => s.status === 'active').length;
  const enabledPolicies = dataPolicies.filter(p => p.enabled).length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Data Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(totalSize / 1024).toFixed(1)} GB</p>
              <p className="text-sm text-gray-600">Total Storage</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(totalRecords / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-600">Total Records</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeSources}</p>
              <p className="text-sm text-gray-600">Active Sources</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{enabledPolicies}</p>
              <p className="text-sm text-gray-600">Active Policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage by Type</h3>
          <div className="space-y-4">
            {['analytics', 'media', 'logs', 'backup'].map((type) => {
              const typeData = dataSources.filter(s => s.type === type);
              const typeSize = typeData.reduce((sum, source) => {
                const size = parseFloat(source.size.split(' ')[0]);
                const unit = source.size.split(' ')[1];
                const multiplier = unit === 'GB' ? 1024 : unit === 'TB' ? 1024 * 1024 : 1;
                return sum + (size * multiplier);
              }, 0);
              const percentage = (typeSize / totalSize) * 100;
              
              return (
                <div key={type} className="flex items-center space-x-3">
                  {getTypeIcon(type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 capitalize">{type}</span>
                      <span className="text-sm text-gray-600">{(typeSize / 1024).toFixed(1)} GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Backup Jobs</h3>
          <div className="space-y-3">
            {backupJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <p className="font-medium text-gray-900">{job.name}</p>
                    <p className="text-sm text-gray-600">{job.type} backup</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  {job.status === 'running' && (
                    <p className="text-sm text-gray-600 mt-1">{job.progress}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Health */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Backup Coverage</span>
              <span className="text-sm font-bold text-green-600">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Encryption Rate</span>
              <span className="text-sm font-bold text-blue-600">88%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Compression Ratio</span>
              <span className="text-sm font-bold text-purple-600">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSources = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search data sources..."
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
              <option value="analytics">Analytics</option>
              <option value="media">Media</option>
              <option value="logs">Logs</option>
              <option value="system">System</option>
              <option value="backup">Backup</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
              <option value="syncing">Syncing</option>
            </select>
          </div>
        </div>

        {selectedSources.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{selectedSources.length} selected</span>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200">
              Sync All
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200">
              Archive
            </button>
            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Data Sources List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Data Sources ({filteredSources.length})
          </h3>
          <div className="space-y-4">
            {filteredSources.map((source) => (
              <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(source.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSources([...selectedSources, source.id]);
                        } else {
                          setSelectedSources(selectedSources.filter(id => id !== source.id));
                        }
                      }}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(source.type)}
                        <h4 className="font-semibold text-gray-900">{source.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                          {source.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-1 font-medium">{source.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Records:</span>
                          <span className="ml-1 font-medium">{source.records.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Retention:</span>
                          <span className="ml-1 font-medium">{source.retention} days</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Updated:</span>
                          <span className="ml-1 font-medium">{source.lastUpdated.split(' ')[0]}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <div className="flex items-center space-x-1">
                          {getLocationIcon(source.location)}
                          <span className="text-gray-600 capitalize">{source.location}</span>
                        </div>
                        {source.encrypted && (
                          <div className="flex items-center space-x-1">
                            <Lock className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">Encrypted</span>
                          </div>
                        )}
                        {source.compressed && (
                          <div className="flex items-center space-x-1">
                            <Archive className="w-3 h-3 text-blue-600" />
                            <span className="text-blue-600">Compressed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleSourceAction(source.id, 'sync')}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      title="Sync"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-amber-600 transition-colors duration-200" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200" title="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackups = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Backup Jobs</h3>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Backup</span>
          </button>
        </div>

        <div className="space-y-4">
          {backupJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.name}</h4>
                    <p className="text-sm text-gray-600">{job.type} backup</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  {job.status === 'running' ? (
                    <button
                      onClick={() => handleBackupAction(job.id, 'stop')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                    >
                      Stop
                    </button>
                  ) : job.status === 'scheduled' ? (
                    <button
                      onClick={() => handleBackupAction(job.id, 'start')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                    >
                      Start Now
                    </button>
                  ) : null}
                </div>
              </div>

              {job.status === 'running' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-600">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Schedule:</span>
                  <span className="ml-1 font-medium capitalize">{job.schedule.frequency} at {job.schedule.time}</span>
                </div>
                <div>
                  <span className="text-gray-500">Retention:</span>
                  <span className="ml-1 font-medium">{job.retention} days</span>
                </div>
                <div>
                  <span className="text-gray-500">Destination:</span>
                  <span className="ml-1 font-medium capitalize">{job.destination}</span>
                </div>
                {job.size && (
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-1 font-medium">{job.size}</span>
                  </div>
                )}
              </div>

              {(job.startTime || job.endTime) && (
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  {job.startTime && <span>Started: {job.startTime}</span>}
                  {job.endTime && <span>Completed: {job.endTime}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Data Management Policies</h3>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add Policy</span>
          </button>
        </div>

        <div className="space-y-4">
          {dataPolicies.map((policy) => (
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
                      {rule.schedule && (
                        <span className="text-xs text-gray-500">({rule.schedule})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {policy.appliesTo.map((target) => (
                    <span key={target} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {target}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Modified: {policy.lastModified}</span>
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
        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
        <p className="text-gray-600 mt-2">Manage your data sources, backups, and storage policies</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'sources', name: 'Data Sources', icon: Database },
            { id: 'backups', name: 'Backups', icon: Archive },
            { id: 'policies', name: 'Policies', icon: FileText },
            { id: 'storage', name: 'Storage', icon: HardDrive }
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
      {activeTab === 'sources' && renderSources()}
      {activeTab === 'backups' && renderBackups()}
      {activeTab === 'policies' && renderPolicies()}
      {activeTab === 'storage' && (
        <div className="text-center py-12">
          <HardDrive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Storage Management</h3>
          <p className="text-gray-600">Advanced storage configuration and monitoring tools coming soon.</p>
        </div>
      )}
    </div>
  );
}