import React, { useState, useEffect } from 'react';
import { Camera, Play, Pause, Volume2, VolumeX, Maximize, Settings, Grid3X3, Sun, Moon, ZoomIn, ZoomOut, RotateCcw, SwordIcon as Record, Square, Eye, EyeOff, Mic, MicOff } from 'lucide-react';

interface DetectedObject {
  id: string;
  type: 'person' | 'car' | 'truck' | 'motorcycle' | 'bus';
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  speed?: number;
  direction?: string;
  licensePlate?: string;
}

interface CameraData {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  resolution: string;
  fps: number;
  lastSeen: string;
  alerts: number;
  detectedObjects: DetectedObject[];
  feedSettings: {
    brightness: number;
    contrast: number;
    zoom: number;
    nightMode: boolean;
    gridOverlay: boolean;
    audioEnabled: boolean;
    recording: boolean;
    detectionOverlay: boolean;
  };
}

const CameraManagement: React.FC = () => {
  const [cameras, setCameras] = useState<CameraData[]>([
    {
      id: 'cam-001',
      name: 'Highway Entrance',
      location: 'Main Gate - North',
      status: 'online',
      resolution: '4K',
      fps: 30,
      lastSeen: '2 seconds ago',
      alerts: 3,
      detectedObjects: [
        { id: '1', type: 'car', x: 120, y: 180, width: 80, height: 60, confidence: 0.95, speed: 45, direction: 'East', licensePlate: 'ABC123' },
        { id: '2', type: 'truck', x: 250, y: 160, width: 100, height: 80, confidence: 0.88, speed: 35, direction: 'East', licensePlate: 'TRK456' },
        { id: '3', type: 'person', x: 50, y: 220, width: 30, height: 70, confidence: 0.92 }
      ],
      feedSettings: {
        brightness: 50,
        contrast: 50,
        zoom: 1.0,
        nightMode: false,
        gridOverlay: false,
        audioEnabled: true,
        recording: false,
        detectionOverlay: true
      }
    },
    {
      id: 'cam-002',
      name: 'Mall Entrance',
      location: 'Shopping Center - East',
      status: 'online',
      resolution: '1080p',
      fps: 25,
      lastSeen: '1 second ago',
      alerts: 1,
      detectedObjects: [
        { id: '4', type: 'person', x: 180, y: 150, width: 35, height: 80, confidence: 0.89 },
        { id: '5', type: 'person', x: 220, y: 140, width: 32, height: 75, confidence: 0.91 },
        { id: '6', type: 'car', x: 300, y: 200, width: 70, height: 50, confidence: 0.87, licensePlate: 'XYZ789' }
      ],
      feedSettings: {
        brightness: 45,
        contrast: 55,
        zoom: 1.2,
        nightMode: false,
        gridOverlay: true,
        audioEnabled: false,
        recording: true,
        detectionOverlay: true
      }
    },
    {
      id: 'cam-003',
      name: 'Sports Center',
      location: 'Recreation Area - West',
      status: 'online',
      resolution: '4K',
      fps: 60,
      lastSeen: '3 seconds ago',
      alerts: 0,
      detectedObjects: [
        { id: '7', type: 'person', x: 100, y: 180, width: 28, height: 65, confidence: 0.94 },
        { id: '8', type: 'motorcycle', x: 280, y: 190, width: 45, height: 35, confidence: 0.86, speed: 25, direction: 'North' }
      ],
      feedSettings: {
        brightness: 60,
        contrast: 45,
        zoom: 0.8,
        nightMode: true,
        gridOverlay: false,
        audioEnabled: true,
        recording: false,
        detectionOverlay: true
      }
    }
  ]);

  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [showControls, setShowControls] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize playing state for all cameras
    const initialPlayingState: { [key: string]: boolean } = {};
    cameras.forEach(camera => {
      initialPlayingState[camera.id] = true;
    });
    setIsPlaying(initialPlayingState);

    // Simulate real-time object detection updates
    const interval = setInterval(() => {
      setCameras(prevCameras => 
        prevCameras.map(camera => ({
          ...camera,
          detectedObjects: generateRandomObjects(camera.location),
          lastSeen: Math.floor(Math.random() * 5) + 1 + ' seconds ago'
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomObjects = (location: string): DetectedObject[] => {
    const objects: DetectedObject[] = [];
    const objectTypes: DetectedObject['type'][] = ['person', 'car', 'truck', 'motorcycle', 'bus'];
    const numObjects = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < numObjects; i++) {
      const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      const isVehicle = type !== 'person';
      
      objects.push({
        id: Math.random().toString(36).substr(2, 9),
        type,
        x: Math.random() * 300 + 50,
        y: Math.random() * 150 + 100,
        width: type === 'person' ? 30 + Math.random() * 10 : 60 + Math.random() * 40,
        height: type === 'person' ? 70 + Math.random() * 20 : 40 + Math.random() * 40,
        confidence: 0.8 + Math.random() * 0.2,
        speed: isVehicle ? Math.floor(Math.random() * 50) + 20 : undefined,
        direction: isVehicle ? ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)] : undefined,
        licensePlate: isVehicle && Math.random() > 0.5 ? generateLicensePlate() : undefined
      });
    }

    return objects;
  };

  const generateLicensePlate = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    return Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('') +
           Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
  };

  const updateCameraSetting = (cameraId: string, setting: keyof CameraData['feedSettings'], value: any) => {
    setCameras(prevCameras =>
      prevCameras.map(camera =>
        camera.id === cameraId
          ? {
              ...camera,
              feedSettings: {
                ...camera.feedSettings,
                [setting]: value
              }
            }
          : camera
      )
    );
  };

  const togglePlayPause = (cameraId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [cameraId]: !prev[cameraId]
    }));
  };

  const toggleControls = (cameraId: string) => {
    setShowControls(prev => ({
      ...prev,
      [cameraId]: !prev[cameraId]
    }));
  };

  const getObjectColor = (type: DetectedObject['type']): string => {
    const colors = {
      person: 'border-green-400',
      car: 'border-blue-400',
      truck: 'border-red-400',
      motorcycle: 'border-yellow-400',
      bus: 'border-purple-400'
    };
    return colors[type];
  };

  const renderCameraFeed = (camera: CameraData) => {
    const isActive = isPlaying[camera.id];
    const showControlPanel = showControls[camera.id];

    return (
      <div key={camera.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {/* Camera Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <Camera className="w-5 h-5 text-gray-300" />
              <span className="text-white font-medium">{camera.name}</span>
            </div>
            {camera.feedSettings.recording && (
              <div className="flex items-center space-x-1 text-red-400">
                <Record className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-medium">REC</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{camera.resolution}</span>
            <span>•</span>
            <span>{camera.fps}fps</span>
            <span>•</span>
            <span>Zoom: {camera.feedSettings.zoom.toFixed(1)}x</span>
          </div>
        </div>

        {/* Live Feed Area */}
        <div className="relative bg-gray-800 aspect-video overflow-hidden">
          {/* Background Environment */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ${
              camera.feedSettings.nightMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-200 to-gray-300'
            }`}
            style={{
              transform: `scale(${camera.feedSettings.zoom})`,
              filter: `brightness(${camera.feedSettings.brightness}%) contrast(${camera.feedSettings.contrast}%)`
            }}
          >
            {/* Location-specific background */}
            {camera.location.includes('Highway') && (
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-600">
                  {/* Road lanes */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-300 opacity-60"></div>
                  <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white opacity-40"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-white opacity-40"></div>
                </div>
              </div>
            )}
            
            {camera.location.includes('Mall') && (
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gray-500">
                  <div className="absolute top-4 left-4 w-16 h-8 bg-gray-700 rounded"></div>
                  <div className="absolute top-4 right-4 w-20 h-12 bg-gray-600 rounded"></div>
                </div>
              </div>
            )}

            {camera.location.includes('Sports') && (
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-36 bg-gray-600">
                  {/* Parking spaces */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`absolute bottom-2 w-12 h-20 border border-white opacity-30`} 
                         style={{ left: `${20 + i * 60}px` }}></div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid Overlay */}
            {camera.feedSettings.gridOverlay && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white opacity-20"></div>
                  ))}
                </div>
              </div>
            )}

            {/* Detected Objects */}
            {camera.feedSettings.detectionOverlay && camera.detectedObjects.map(obj => (
              <div key={obj.id}>
                {/* Bounding Box */}
                <div
                  className={`absolute border-2 ${getObjectColor(obj.type)} bg-transparent`}
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`
                  }}
                >
                  {/* Object Label */}
                  <div className={`absolute -top-6 left-0 px-2 py-1 text-xs font-medium text-white bg-black bg-opacity-75 rounded`}>
                    {obj.type} {(obj.confidence * 100).toFixed(0)}%
                    {obj.speed && <span className="ml-1">{obj.speed}mph</span>}
                  </div>
                </div>

                {/* License Plate Detection */}
                {obj.licensePlate && (
                  <div
                    className="absolute border-2 border-yellow-400 bg-yellow-400 bg-opacity-20"
                    style={{
                      left: `${obj.x + obj.width * 0.2}px`,
                      top: `${obj.y + obj.height * 0.8}px`,
                      width: `${obj.width * 0.6}px`,
                      height: `${obj.height * 0.15}px`
                    }}
                  >
                    <div className="absolute -top-5 left-0 px-1 py-0.5 text-xs font-mono text-black bg-yellow-300 rounded">
                      {obj.licensePlate}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Live Metrics Overlay */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white p-3 rounded-lg text-sm">
              <div className="space-y-1">
                <div>People: {camera.detectedObjects.filter(obj => obj.type === 'person').length}</div>
                <div>Vehicles: {camera.detectedObjects.filter(obj => obj.type !== 'person').length}</div>
                <div>Avg Speed: {Math.round(camera.detectedObjects.filter(obj => obj.speed).reduce((acc, obj) => acc + (obj.speed || 0), 0) / camera.detectedObjects.filter(obj => obj.speed).length) || 0} mph</div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {camera.feedSettings.audioEnabled && (
                <div className="bg-green-500 bg-opacity-80 p-1 rounded">
                  <Mic className="w-4 h-4 text-white" />
                </div>
              )}
              {camera.feedSettings.nightMode && (
                <div className="bg-blue-500 bg-opacity-80 p-1 rounded">
                  <Moon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Paused Overlay */}
            {!isActive && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Pause className="w-16 h-16 mx-auto mb-2 opacity-80" />
                  <p className="text-lg font-medium">Feed Paused</p>
                </div>
              </div>
            )}
          </div>

          {/* Control Panel Overlay */}
          {showControlPanel && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-white text-lg font-medium mb-4">Camera Controls</h3>
                
                <div className="space-y-4">
                  {/* Zoom Control */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Zoom: {camera.feedSettings.zoom.toFixed(1)}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={camera.feedSettings.zoom}
                      onChange={(e) => updateCameraSetting(camera.id, 'zoom', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Brightness Control */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Brightness: {camera.feedSettings.brightness}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={camera.feedSettings.brightness}
                      onChange={(e) => updateCameraSetting(camera.id, 'brightness', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Contrast Control */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Contrast: {camera.feedSettings.contrast}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={camera.feedSettings.contrast}
                      onChange={(e) => updateCameraSetting(camera.id, 'contrast', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Toggle Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateCameraSetting(camera.id, 'nightMode', !camera.feedSettings.nightMode)}
                      className={`flex items-center justify-center space-x-2 p-2 rounded ${
                        camera.feedSettings.nightMode ? 'bg-blue-600' : 'bg-gray-600'
                      } text-white`}
                    >
                      {camera.feedSettings.nightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      <span className="text-sm">Night Mode</span>
                    </button>

                    <button
                      onClick={() => updateCameraSetting(camera.id, 'gridOverlay', !camera.feedSettings.gridOverlay)}
                      className={`flex items-center justify-center space-x-2 p-2 rounded ${
                        camera.feedSettings.gridOverlay ? 'bg-green-600' : 'bg-gray-600'
                      } text-white`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                      <span className="text-sm">Grid</span>
                    </button>

                    <button
                      onClick={() => updateCameraSetting(camera.id, 'detectionOverlay', !camera.feedSettings.detectionOverlay)}
                      className={`flex items-center justify-center space-x-2 p-2 rounded ${
                        camera.feedSettings.detectionOverlay ? 'bg-purple-600' : 'bg-gray-600'
                      } text-white`}
                    >
                      {camera.feedSettings.detectionOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      <span className="text-sm">Detection</span>
                    </button>

                    <button
                      onClick={() => updateCameraSetting(camera.id, 'audioEnabled', !camera.feedSettings.audioEnabled)}
                      className={`flex items-center justify-center space-x-2 p-2 rounded ${
                        camera.feedSettings.audioEnabled ? 'bg-green-600' : 'bg-gray-600'
                      } text-white`}
                    >
                      {camera.feedSettings.audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      <span className="text-sm">Audio</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleControls(camera.id)}
                  className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Close Controls
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Camera Footer Controls */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => togglePlayPause(camera.id)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isActive ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => updateCameraSetting(camera.id, 'recording', !camera.feedSettings.recording)}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                camera.feedSettings.recording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {camera.feedSettings.recording ? <Square className="w-4 h-4" /> : <Record className="w-4 h-4" />}
              <span className="text-sm">{camera.feedSettings.recording ? 'Stop' : 'Record'}</span>
            </button>

            <button
              onClick={() => toggleControls(camera.id)}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Controls</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{camera.location}</span>
            <span>•</span>
            <span>Last seen: {camera.lastSeen}</span>
            {camera.alerts > 0 && (
              <>
                <span>•</span>
                <span className="text-red-400">{camera.alerts} alerts</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Camera Management</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{cameras.filter(c => c.status === 'online').length} cameras online</span>
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {cameras.map(camera => renderCameraFeed(camera))}
      </div>

      {/* Camera Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Live Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {cameras.reduce((acc, camera) => acc + camera.detectedObjects.filter(obj => obj.type !== 'person').length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Vehicles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {cameras.reduce((acc, camera) => acc + camera.detectedObjects.filter(obj => obj.type === 'person').length, 0)}
            </div>
            <div className="text-sm text-gray-600">People Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {cameras.reduce((acc, camera) => acc + camera.detectedObjects.filter(obj => obj.licensePlate).length, 0)}
            </div>
            <div className="text-sm text-gray-600">License Plates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {cameras.reduce((acc, camera) => acc + camera.alerts, 0)}
            </div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraManagement;