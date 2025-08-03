import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  FileText, 
  BarChart3, 
  Users, 
  Car, 
  Monitor, 
  Clock, 
  Filter,
  Search,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'people' | 'vehicle' | 'screen' | 'combined';
  dateRange: string;
  generatedDate: string;
  size: string;
  status: 'ready' | 'generating' | 'failed';
  description: string;
}

const existingReports: Report[] = [
  {
    id: '1',
    name: 'Weekly People Analytics Report',
    type: 'people',
    dateRange: 'Jan 1-7, 2025',
    generatedDate: '2025-01-08 09:30',
    size: '2.4 MB',
    status: 'ready',
    description: 'Comprehensive analysis of pedestrian traffic patterns across all LED screen locations'
  },
  {
    id: '2',
    name: 'Monthly Vehicle Traffic Summary',
    type: 'vehicle',
    dateRange: 'December 2024',
    generatedDate: '2025-01-01 14:15',
    size: '1.8 MB',
    status: 'ready',
    description: 'Vehicle detection statistics and traffic flow analysis for highway locations'
  },
  {
    id: '3',
    name: 'Screen Performance Report',
    type: 'screen',
    dateRange: 'Jan 1-8, 2025',
    generatedDate: '2025-01-08 16:45',
    size: '3.2 MB',
    status: 'ready',
    description: 'Hardware status, uptime, and maintenance records for all LED screens'
  },
  {
    id: '4',
    name: 'Daily Analytics Digest',
    type: 'combined',
    dateRange: 'Jan 8, 2025',
    generatedDate: '2025-01-08 23:59',
    size: '1.1 MB',
    status: 'generating',
    description: 'Combined daily report including people, vehicle, and screen analytics'
  }
];

const reportTemplates = [
  {
    id: 'people-weekly',
    name: 'People Analytics - Weekly',
    type: 'people' as const,
    icon: Users,
    description: 'Weekly pedestrian traffic analysis with demographic insights'
  },
  {
    id: 'people-monthly',
    name: 'People Analytics - Monthly',
    type: 'people' as const,
    icon: Users,
    description: 'Monthly people detection trends and patterns'
  },
  {
    id: 'vehicle-daily',
    name: 'Vehicle Traffic - Daily',
    type: 'vehicle' as const,
    icon: Car,
    description: 'Daily vehicle detection and classification report'
  },
  {
    id: 'vehicle-weekly',
    name: 'Vehicle Traffic - Weekly',
    type: 'vehicle' as const,
    icon: Car,
    description: 'Weekly traffic flow analysis and vehicle type breakdown'
  },
  {
    id: 'screen-performance',
    name: 'Screen Performance Report',
    type: 'screen' as const,
    icon: Monitor,
    description: 'Hardware status, uptime, and maintenance summary'
  },
  {
    id: 'combined-summary',
    name: 'Combined Analytics Summary',
    type: 'combined' as const,
    icon: BarChart3,
    description: 'Comprehensive report covering all analytics data'
  }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'existing' | 'generate'>('existing');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'people' | 'vehicle' | 'screen' | 'combined'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedScreens, setSelectedScreens] = useState<string[]>([]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'people': return 'bg-blue-100 text-blue-800';
      case 'vehicle': return 'bg-green-100 text-green-800';
      case 'screen': return 'bg-purple-100 text-purple-800';
      case 'combined': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = existingReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (reportId: string, reportName: string) => {
    // Simulate download
    console.log(`Downloading report: ${reportName}`);
    // In production, this would trigger an actual file download
  };

  const handleGenerateReport = () => {
    if (!selectedTemplate || !dateRange.start || !dateRange.end) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Generating report:', {
      template: selectedTemplate,
      dateRange,
      screens: selectedScreens
    });
    
    // Reset form
    setSelectedTemplate('');
    setDateRange({ start: '', end: '' });
    setSelectedScreens([]);
    setActiveTab('existing');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate, view, and download analytics reports</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('existing')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'existing'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Existing Reports</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'generate'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Generate New Report</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'existing' ? (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All Types</option>
                <option value="people">People Analytics</option>
                <option value="vehicle">Vehicle Analytics</option>
                <option value="screen">Screen Reports</option>
                <option value="combined">Combined Reports</option>
              </select>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{report.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{report.dateRange}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Generated: {report.generatedDate}</span>
                          </span>
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          title="Preview Report"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(report.id, report.name)}
                          disabled={report.status !== 'ready'}
                          className={`p-2 transition-colors duration-200 ${
                            report.status === 'ready'
                              ? 'text-gray-400 hover:text-green-600'
                              : 'text-gray-300 cursor-not-allowed'
                          }`}
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                          title="Delete Report"
                        >
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
      ) : (
        <div className="space-y-6">
          {/* Report Templates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Report Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(template.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Screen Locations (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Mall Plaza', 'Highway 401', 'Sports Center', 'Shopping District', 'Airport Terminal'].map((screen) => (
                  <label key={screen} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedScreens.includes(screen)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedScreens([...selectedScreens, screen]);
                        } else {
                          setSelectedScreens(selectedScreens.filter(s => s !== screen));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{screen}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Leave empty to include all locations</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleGenerateReport}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}