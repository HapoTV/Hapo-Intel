import React, { useState } from 'react';
import { Download, FileText, Database, Image, Video, Calendar, Filter, Settings, Users, Car, Monitor, Activity, BarChart3, PieChart, TrendingUp, Clock, MapPin, CheckCircle, AlertCircle, RefreshCw, Eye, Trash2, Archive, Share2, Mail, Cloud, HardDrive, Zap, Globe, Lock, Unlock, FileSpreadsheet, FileJson, File as FileCsv } from 'lucide-react';

interface ExportJob {
  id: string;
  name: string;
  type: 'analytics' | 'reports' | 'media' | 'system' | 'logs';
  format: 'csv' | 'json' | 'pdf' | 'xlsx' | 'zip';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  fileSize?: string;
  downloadUrl?: string;
  description: string;
  dataRange: {
    start: string;
    end: string;
  };
  filters: Record<string, any>;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'analytics' | 'reports' | 'media' | 'system' | 'logs';
  format: 'csv' | 'json' | 'pdf' | 'xlsx' | 'zip';
  icon: React.ComponentType<any>;
  fields: string[];
  defaultFilters: Record<string, any>;
}

const exportTemplates: ExportTemplate[] = [
  {
    id: 'people-analytics',
    name: 'People Analytics Report',
    description: 'Comprehensive people detection and demographic data',
    type: 'analytics',
    format: 'xlsx',
    icon: Users,
    fields: ['timestamp', 'location', 'count', 'age_group', 'gender', 'dwell_time'],
    defaultFilters: { includeDemo: true, minConfidence: 0.8 }
  },
  {
    id: 'vehicle-analytics',
    name: 'Vehicle Traffic Report',
    description: 'Vehicle detection, classification, and traffic flow data',
    type: 'analytics',
    format: 'csv',
    icon: Car,
    fields: ['timestamp', 'location', 'vehicle_type', 'speed', 'direction', 'license_plate'],
    defaultFilters: { includeSpeed: true, includeClassification: true }
  },
  {
    id: 'screen-performance',
    name: 'Screen Performance Report',
    description: 'LED screen uptime, performance metrics, and hardware status',
    type: 'reports',
    format: 'pdf',
    icon: Monitor,
    fields: ['screen_id', 'uptime', 'temperature', 'power_consumption', 'errors'],
    defaultFilters: { includeHardware: true, includeErrors: true }
  },
  {
    id: 'system-logs',
    name: 'System Logs Export',
    description: 'Complete system logs and audit trail',
    type: 'logs',
    format: 'json',
    icon: FileText,
    fields: ['timestamp', 'level', 'source', 'message', 'user', 'ip_address'],
    defaultFilters: { minLevel: 'info', includeAudit: true }
  },
  {
    id: 'media-content',
    name: 'Media Content Archive',
    description: 'All uploaded media files and metadata',
    type: 'media',
    format: 'zip',
    icon: Image,
    fields: ['filename', 'upload_date', 'file_size', 'format', 'screens_assigned'],
    defaultFilters: { includeMetadata: true, includePreview: false }
  },
  {
    id: 'combined-analytics',
    name: 'Combined Analytics Dashboard',
    description: 'All analytics data in a comprehensive report',
    type: 'analytics',
    format: 'pdf',
    icon: BarChart3,
    fields: ['all_metrics', 'charts', 'summaries', 'trends'],
    defaultFilters: { includeCharts: true, includeSummary: true }
  }
];

const mockExportJobs: ExportJob[] = [
  {
    id: '1',
    name: 'Weekly People Analytics',
    type: 'analytics',
    format: 'xlsx',
    status: 'completed',
    progress: 100,
    createdAt: '2025-01-08 09:30:00',
    completedAt: '2025-01-08 09:35:00',
    fileSize: '2.4 MB',
    downloadUrl: '/exports/people-analytics-week1.xlsx',
    description: 'People detection data for Jan 1-7, 2025',
    dataRange: { start: '2025-01-01', end: '2025-01-07' },
    filters: { locations: ['all'], includeDemo: true }
  },
  {
    id: '2',
    name: 'Vehicle Traffic Report',
    type: 'analytics',
    format: 'csv',
    status: 'processing',
    progress: 65,
    createdAt: '2025-01-08 10:15:00',
    description: 'Vehicle analytics for Highway 401 location',
    dataRange: { start: '2025-01-01', end: '2025-01-08' },
    filters: { locations: ['Highway 401'], includeSpeed: true }
  },
  {
    id: '3',
    name: 'System Performance Report',
    type: 'reports',
    format: 'pdf',
    status: 'pending',
    progress: 0,
    createdAt: '2025-01-08 10:45:00',
    description: 'Monthly system performance and uptime report',
    dataRange: { start: '2024-12-01', end: '2024-12-31' },
    filters: { includeHardware: true, includeAlerts: true }
  },
  {
    id: '4',
    name: 'Media Archive December',
    type: 'media',
    format: 'zip',
    status: 'failed',
    progress: 0,
    createdAt: '2025-01-08 08:20:00',
    description: 'All media content uploaded in December 2024',
    dataRange: { start: '2024-12-01', end: '2024-12-31' },
    filters: { includeMetadata: true, formats: ['jpg', 'mp4'] }
  }
];

export default function Export() {
  const [exportJobs, setExportJobs] = useState<ExportJob[]>(mockExportJobs);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    name: '',
    description: '',
    dateRange: { start: '', end: '' },
    locations: [] as string[],
    format: 'csv' as 'csv' | 'json' | 'pdf' | 'xlsx' | 'zip',
    includeMetadata: true,
    includeCharts: false,
    compression: true,
    encryption: false,
    schedule: {
      enabled: false,
      frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
      time: '09:00',
      day: 'monday'
    }
  });
  const [filterType, setFilterType] = useState<'all' | 'analytics' | 'reports' | 'media' | 'system' | 'logs'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'csv': return <FileCsv className="w-4 h-4" />;
      case 'xlsx': return <FileSpreadsheet className="w-4 h-4" />;
      case 'json': return <FileJson className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'zip': return <Archive className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'reports': return <FileText className="w-4 h-4" />;
      case 'media': return <Image className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'logs': return <Activity className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const handleCreateExport = () => {
    if (!selectedTemplate || !exportConfig.name || !exportConfig.dateRange.start || !exportConfig.dateRange.end) {
      alert('Please fill in all required fields');
      return;
    }

    const template = exportTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const newJob: ExportJob = {
      id: Date.now().toString(),
      name: exportConfig.name,
      type: template.type,
      format: exportConfig.format,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      description: exportConfig.description,
      dataRange: exportConfig.dateRange,
      filters: {
        locations: exportConfig.locations,
        includeMetadata: exportConfig.includeMetadata,
        includeCharts: exportConfig.includeCharts,
        compression: exportConfig.compression,
        encryption: exportConfig.encryption
      }
    };

    setExportJobs(prev => [newJob, ...prev]);
    setShowCreateModal(false);
    
    // Reset form
    setSelectedTemplate('');
    setExportConfig({
      name: '',
      description: '',
      dateRange: { start: '', end: '' },
      locations: [],
      format: 'csv',
      includeMetadata: true,
      includeCharts: false,
      compression: true,
      encryption: false,
      schedule: {
        enabled: false,
        frequency: 'weekly',
        time: '09:00',
        day: 'monday'
      }
    });

    // Simulate processing
    setTimeout(() => {
      setExportJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'processing' } : job
      ));
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setExportJobs(prev => prev.map(job => 
            job.id === newJob.id ? { 
              ...job, 
              status: 'completed', 
              progress: 100,
              completedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
              fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
              downloadUrl: `/exports/${newJob.name.toLowerCase().replace(/\s+/g, '-')}.${newJob.format}`
            } : job
          ));
        } else {
          setExportJobs(prev => prev.map(job => 
            job.id === newJob.id ? { ...job, progress } : job
          ));
        }
      }, 500);
    }, 1000);
  };

  const handleDownload = (job: ExportJob) => {
    if (job.status === 'completed' && job.downloadUrl) {
      // Simulate download
      console.log(`Downloading: ${job.downloadUrl}`);
      // In production, this would trigger an actual file download
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setExportJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const filteredJobs = exportJobs.filter(job => {
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const completedJobs = exportJobs.filter(job => job.status === 'completed').length;
  const processingJobs = exportJobs.filter(job => job.status === 'processing').length;
  const failedJobs = exportJobs.filter(job => job.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Export</h1>
        <p className="text-gray-600 mt-2">Export your analytics data, reports, and media content</p>
      </div>

      {/* Export Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{exportJobs.length}</p>
              <p className="text-sm text-gray-600">Total Exports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedJobs}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{processingJobs}</p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{failedJobs}</p>
              <p className="text-sm text-gray-600">Failed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Export Templates</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Create Export</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setExportConfig(prev => ({
                    ...prev,
                    name: template.name,
                    description: template.description,
                    format: template.format
                  }));
                  setShowCreateModal(true);
                }}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 capitalize">{template.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 uppercase">{template.format}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.fields.slice(0, 3).map((field) => (
                    <span key={field} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {field.replace('_', ' ')}
                    </span>
                  ))}
                  {template.fields.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{template.fields.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Export History</h3>
            <div className="flex items-center space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                
                <option value="analytics">Analytics</option>
                <option value="reports">Reports</option>
                <option value="media">Media</option>
                <option value="system">System</option>
                <option value="logs">Logs</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(job.type)}
                      {getFormatIcon(job.format)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.name}</h4>
                      <p className="text-sm text-gray-600">{job.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(job.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                </div>

                {job.status === 'processing' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Processing...</span>
                      <span className="text-gray-600">{Math.round(job.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{job.dataRange.start} to {job.dataRange.end}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Created: {job.createdAt}</span>
                    </div>
                    {job.fileSize && (
                      <div className="flex items-center space-x-1">
                        <HardDrive className="w-3 h-3" />
                        <span>{job.fileSize}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {job.status === 'completed' && (
                      <>
                        <button
                          onClick={() => handleDownload(job)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No exports found</h3>
              <p className="text-gray-600">Create your first export using the templates above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Export Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create Export</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Export Name</label>
                    <input
                      type="text"
                      value={exportConfig.name}
                      onChange={(e) => setExportConfig(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter export name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select
                      value={exportConfig.format}
                      onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="csv">CSV</option>
                      <option value="xlsx">Excel (XLSX)</option>
                      <option value="json">JSON</option>
                      <option value="pdf">PDF</option>
                      <option value="zip">ZIP Archive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={exportConfig.description}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what this export contains"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={exportConfig.dateRange.start}
                      onChange={(e) => setExportConfig(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, start: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={exportConfig.dateRange.end}
                      onChange={(e) => setExportConfig(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, end: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Export Options</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={exportConfig.includeMetadata}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, includeMetadata: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Include metadata</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={exportConfig.includeCharts}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Include charts and visualizations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={exportConfig.compression}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, compression: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Enable compression</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={exportConfig.encryption}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, encryption: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Encrypt export file</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={exportConfig.schedule.enabled}
                      onChange={(e) => setExportConfig(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule, enabled: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Schedule recurring export</span>
                  </label>
                  
                  {exportConfig.schedule.enabled && (
                    <div className="grid grid-cols-3 gap-3 ml-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                        <select
                          value={exportConfig.schedule.frequency}
                          onChange={(e) => setExportConfig(prev => ({ 
                            ...prev, 
                            schedule: { ...prev.schedule, frequency: e.target.value as any }
                          }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Time</label>
                        <input
                          type="time"
                          value={exportConfig.schedule.time}
                          onChange={(e) => setExportConfig(prev => ({ 
                            ...prev, 
                            schedule: { ...prev.schedule, time: e.target.value }
                          }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {exportConfig.schedule.frequency === 'weekly' && (
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Day</label>
                          <select
                            value={exportConfig.schedule.day}
                            onChange={(e) => setExportConfig(prev => ({ 
                              ...prev, 
                              schedule: { ...prev.schedule, day: e.target.value }
                            }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateExport}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}