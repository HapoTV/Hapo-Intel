import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, FileText, Calendar, Clock, Monitor, Target, CheckCircle, AlertCircle, CrossIcon as Progress, FolderOpen, Settings, Eye, Download, Trash2, Edit3, Copy, Share2, Tag, Users, Car, Globe } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadDate: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  thumbnail?: string;
  duration?: string;
  resolution?: string;
  tags: string[];
  targetAudience: string;
  scheduledScreens: string[];
}

const mockFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'morning-commute-ad.mp4',
    type: 'video',
    size: 15728640, // 15MB
    uploadDate: '2025-01-08 09:30',
    status: 'ready',
    progress: 100,
    duration: '30s',
    resolution: '1920x1080',
    tags: ['advertising', 'commute', 'morning'],
    targetAudience: 'commuters',
    scheduledScreens: ['Mall Plaza', 'Highway 401']
  },
  {
    id: '2',
    name: 'lunch-promotion-banner.jpg',
    type: 'image',
    size: 2097152, // 2MB
    uploadDate: '2025-01-08 11:15',
    status: 'ready',
    progress: 100,
    resolution: '1920x1080',
    tags: ['food', 'promotion', 'lunch'],
    targetAudience: 'shoppers',
    scheduledScreens: ['Mall Plaza', 'Sports Center']
  },
  {
    id: '3',
    name: 'evening-entertainment.mp4',
    type: 'video',
    size: 31457280, // 30MB
    uploadDate: '2025-01-08 14:20',
    status: 'processing',
    progress: 75,
    duration: '45s',
    resolution: '4K',
    tags: ['entertainment', 'evening', 'events'],
    targetAudience: 'general',
    scheduledScreens: ['All Locations']
  }
];

const screenLocations = [
  'Mall Plaza - Main Entrance',
  'Highway 401 - North Bound',
  'Sports Center - Parking',
  'Shopping District - Central',
  'Airport Terminal - Arrivals'
];

const audienceTypes = [
  { id: 'commuters', label: 'Commuters', icon: Car },
  { id: 'shoppers', label: 'Shoppers', icon: Users },
  { id: 'general', label: 'General Public', icon: Target },
  { id: 'night_travelers', label: 'Night Travelers', icon: Globe }
];

export default function ContentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSettings, setUploadSettings] = useState({
    targetAudience: 'general',
    scheduledScreens: [] as string[],
    tags: [] as string[],
    autoSchedule: false,
    startTime: '',
    endTime: '',
    duration: '15'
  });
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      type: file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : 'document',
      size: file.size,
      uploadDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'uploading',
      progress: 0,
      tags: uploadSettings.tags,
      targetAudience: uploadSettings.targetAudience,
      scheduledScreens: uploadSettings.scheduledScreens
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          const newStatus = newProgress === 100 ? 'processing' : 'uploading';
          
          if (newProgress === 100) {
            setTimeout(() => {
              setFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'ready' } : f
              ));
            }, 2000);
          }
          
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
      
      if (files.find(f => f.id === fileId)?.progress === 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'uploading': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Progress className="w-4 h-4 animate-spin" />;
      case 'uploading': return <Upload className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const addTag = () => {
    if (newTag.trim() && !uploadSettings.tags.includes(newTag.trim())) {
      setUploadSettings(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setUploadSettings(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on files:`, selectedFiles);
    // Implement bulk actions
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Content Upload</h3>
            <p className="text-sm text-gray-600">Upload and manage your LED screen content</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Settings className="w-4 h-4" />
            <span>Upload Settings</span>
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Drop files here or click to upload
              </h4>
              <p className="text-gray-600 mb-4">
                Support for images, videos, and documents up to 100MB
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Choose Files
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <FolderOpen className="w-4 h-4 inline mr-2" />
                  Browse Library
                </button>
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Quick Upload Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Video className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900">{files.filter(f => f.type === 'video').length}</p>
            <p className="text-sm text-blue-700">Videos</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <Image className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900">{files.filter(f => f.type === 'image').length}</p>
            <p className="text-sm text-green-700">Images</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <Progress className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-amber-900">{files.filter(f => f.status === 'uploading' || f.status === 'processing').length}</p>
            <p className="text-sm text-amber-700">Processing</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-900">{files.filter(f => f.status === 'ready').length}</p>
            <p className="text-sm text-purple-700">Ready</p>
          </div>
        </div>
      </div>

      {/* File Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Content Library</h3>
          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedFiles.length} selected</span>
              <button
                onClick={() => handleBulkAction('schedule')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors duration-200"
              >
                Schedule
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

        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFiles([...selectedFiles, file.id]);
                    } else {
                      setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                
                <div className="flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 truncate">{file.name}</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                        {file.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="text-gray-500">Size: </span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Uploaded: </span>
                      <span>{file.uploadDate}</span>
                    </div>
                    {file.duration && (
                      <div>
                        <span className="text-gray-500">Duration: </span>
                        <span>{file.duration}</span>
                      </div>
                    )}
                    {file.resolution && (
                      <div>
                        <span className="text-gray-500">Resolution: </span>
                        <span>{file.resolution}</span>
                      </div>
                    )}
                  </div>

                  {file.status === 'uploading' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Uploading...</span>
                        <span className="text-gray-600">{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 capitalize">{file.targetAudience.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Monitor className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{file.scheduledScreens.length} screens</span>
                      </div>
                      {file.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <div className="flex space-x-1">
                            {file.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {file.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{file.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-amber-600 transition-colors duration-200">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Settings Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upload Settings</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Target Audience</label>
                  <div className="grid grid-cols-2 gap-3">
                    {audienceTypes.map((audience) => {
                      const Icon = audience.icon;
                      return (
                        <button
                          key={audience.id}
                          onClick={() => setUploadSettings(prev => ({ ...prev, targetAudience: audience.id }))}
                          className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors duration-200 ${
                            uploadSettings.targetAudience === audience.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{audience.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Screen Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Default Screen Assignment</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {screenLocations.map((screen) => (
                      <label key={screen} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={uploadSettings.scheduledScreens.includes(screen)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUploadSettings(prev => ({
                                ...prev,
                                scheduledScreens: [...prev.scheduledScreens, screen]
                              }));
                            } else {
                              setUploadSettings(prev => ({
                                ...prev,
                                scheduledScreens: prev.scheduledScreens.filter(s => s !== screen)
                              }));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{screen}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Default Tags</label>
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uploadSettings.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Auto-Schedule */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={uploadSettings.autoSchedule}
                      onChange={(e) => setUploadSettings(prev => ({ ...prev, autoSchedule: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Auto-schedule uploaded content</span>
                  </label>
                  
                  {uploadSettings.autoSchedule && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                        <input
                          type="time"
                          value={uploadSettings.startTime}
                          onChange={(e) => setUploadSettings(prev => ({ ...prev, startTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">End Time</label>
                        <input
                          type="time"
                          value={uploadSettings.endTime}
                          onChange={(e) => setUploadSettings(prev => ({ ...prev, endTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Duration (seconds)</label>
                        <input
                          type="number"
                          value={uploadSettings.duration}
                          onChange={(e) => setUploadSettings(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}