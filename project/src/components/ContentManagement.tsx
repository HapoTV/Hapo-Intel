import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Upload, Calendar, Clock, Image, Video, Database, Send, FolderSync as Sync, Settings, Globe, BarChart3, Users, Car, Target, Wifi, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import ContentUpload from './ContentUpload';

const contentSchedule = [
  {
    id: 1,
    name: 'Morning Commute Ads',
    type: 'video',
    duration: '30s',
    startTime: '06:00',
    endTime: '09:00',
    screens: ['Mall Plaza', 'Highway 401'],
    status: 'active',
    cmsSync: 'synced',
    lastSync: '2025-01-08 09:15',
    targetAudience: 'commuters',
    analyticsData: {
      peopleCount: 2847,
      vehicleCount: 1234,
      engagement: 87.5
    }
  },
  {
    id: 2,
    name: 'Lunch Promotions',
    type: 'image',
    duration: '15s',
    startTime: '11:30',
    endTime: '14:00',
    screens: ['Mall Plaza', 'Sports Center'],
    status: 'scheduled',
    cmsSync: 'pending',
    lastSync: '2025-01-08 08:30',
    targetAudience: 'shoppers',
    analyticsData: {
      peopleCount: 1456,
      vehicleCount: 892,
      engagement: 92.1
    }
  },
  {
    id: 3,
    name: 'Evening Entertainment',
    type: 'video',
    duration: '45s',
    startTime: '17:00',
    endTime: '22:00',
    screens: ['All Locations'],
    status: 'active',
    cmsSync: 'synced',
    lastSync: '2025-01-08 09:45',
    targetAudience: 'general',
    analyticsData: {
      peopleCount: 5234,
      vehicleCount: 2847,
      engagement: 78.9
    }
  },
  {
    id: 4,
    name: 'Night Mode Display',
    type: 'image',
    duration: '60s',
    startTime: '22:00',
    endTime: '06:00',
    screens: ['Highway 401', 'Airport Terminal'],
    status: 'active',
    cmsSync: 'error',
    lastSync: '2025-01-07 23:15',
    targetAudience: 'night_travelers',
    analyticsData: {
      peopleCount: 892,
      vehicleCount: 456,
      engagement: 65.3
    }
  }
];

const cmsSettings = {
  endpoint: 'https://cms.hapogroup.com/api',
  apiKey: 'hg_cms_key_***',
  syncInterval: '5 minutes',
  lastFullSync: '2025-01-08 09:00',
  status: 'connected'
};

export default function ContentManagement() {
  const [selectedContent, setSelectedContent] = useState<number | null>(null);
  const [showCMSPanel, setShowCMSPanel] = useState(false);
  const [showAnalyticsSync, setShowAnalyticsSync] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [syncingContent, setSyncingContent] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusColor = (syncStatus: string) => {
    switch (syncStatus) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncIcon = (syncStatus: string) => {
    switch (syncStatus) {
      case 'synced': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Sync className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? <Video className="w-4 h-4" /> : <Image className="w-4 h-4" />;
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'commuters': return <Car className="w-4 h-4" />;
      case 'shoppers': return <Users className="w-4 h-4" />;
      case 'night_travelers': return <Globe className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const handleSyncToCMS = async (contentId: number) => {
    setSyncingContent(contentId);
    // Simulate API call to CMS
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncingContent(null);
    console.log(`Syncing content ${contentId} to CMS with analytics data`);
  };

  const handleBulkSync = async () => {
    console.log('Performing bulk sync of all content and analytics to CMS');
    // Simulate bulk sync
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const handleAnalyticsSync = async () => {
    console.log('Syncing analytics data to CMS for content optimization');
    // Simulate analytics sync
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  if (showUploadPanel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Upload</h1>
            <p className="text-gray-600 mt-2">Upload and manage your LED screen content</p>
          </div>
          <button
            onClick={() => setShowUploadPanel(false)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <span>Back to Management</span>
          </button>
        </div>
        <ContentUpload />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CMS Integration Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">CMS Integration</h3>
              <p className="text-sm text-gray-600">Sync content and analytics data to your content management system</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              cmsSettings.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <Wifi className="w-4 h-4" />
              <span>{cmsSettings.status}</span>
            </div>
            <button
              onClick={() => setShowCMSPanel(!showCMSPanel)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showCMSPanel && (
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">CMS Endpoint</p>
                <p className="font-medium text-gray-900">{cmsSettings.endpoint}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sync Interval</p>
                <p className="font-medium text-gray-900">{cmsSettings.syncInterval}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Full Sync</p>
                <p className="font-medium text-gray-900">{cmsSettings.lastFullSync}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBulkSync}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Sync className="w-4 h-4" />
                <span>Bulk Sync All</span>
              </button>
              <button
                onClick={() => setShowAnalyticsSync(!showAnalyticsSync)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Sync</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <Settings className="w-4 h-4" />
                <span>CMS Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analytics Data Sync Panel */}
      {showAnalyticsSync && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Data Sync</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">People Analytics</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">12,847</p>
              <p className="text-sm text-blue-700">Total detected today</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Car className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Vehicle Analytics</span>
              </div>
              <p className="text-2xl font-bold text-green-900">4,392</p>
              <p className="text-sm text-green-700">Total detected today</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Engagement Rate</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">84.7%</p>
              <p className="text-sm text-purple-700">Average across all content</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAnalyticsSync}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Send Analytics to CMS</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <RefreshCw className="w-4 h-4" />
              <span>Auto-Sync Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
          <button
            onClick={() => setShowUploadPanel(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Content</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {contentSchedule.map((content) => (
            <div 
              key={content.id} 
              className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedContent === content.id ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedContent(selectedContent === content.id ? null : content.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(content.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{content.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{content.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{content.startTime} - {content.endTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        {getAudienceIcon(content.targetAudience)}
                        <span className="capitalize">{content.targetAudience.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getSyncIcon(content.cmsSync)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSyncStatusColor(content.cmsSync)}`}>
                      {content.cmsSync}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                    {content.status}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSyncToCMS(content.id);
                      }}
                      disabled={syncingContent === content.id}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
                    >
                      {syncingContent === content.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-amber-600 transition-colors duration-200">
                      <Pause className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedContent === content.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Content Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Assigned Screens:</span>
                          <span className="text-gray-900">{content.screens.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Content Type:</span>
                          <span className="text-gray-900 capitalize">{content.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last CMS Sync:</span>
                          <span className="text-gray-900">{content.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Analytics Data</h5>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-blue-900">{content.analyticsData.peopleCount.toLocaleString()}</p>
                          <p className="text-xs text-blue-700">People</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <Car className="w-4 h-4 text-green-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-green-900">{content.analyticsData.vehicleCount.toLocaleString()}</p>
                          <p className="text-xs text-green-700">Vehicles</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                          <BarChart3 className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                          <p className="text-lg font-bold text-purple-900">{content.analyticsData.engagement}%</p>
                          <p className="text-xs text-purple-700">Engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleSyncToCMS(content.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
                    >
                      Sync to CMS
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors duration-200">
                      Send Analytics
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors duration-200">
                      Edit Schedule
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors duration-200">
                      Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}