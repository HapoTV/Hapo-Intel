import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Database, 
  Wifi, 
  Globe, 
  Clock, 
  Palette, 
  Key, 
  Users, 
  Mail, 
  Smartphone, 
  Save, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  AlertTriangle,
  Info,
  Camera,
  Zap,
  HardDrive,
  Activity,
  MapPin,
  Calendar,
  FileText,
  Lock,
  Unlock,
  Edit3,
  Plus,
  Minus
} from 'lucide-react';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

const settingsSections: SettingsSection[] = [
  { id: 'general', name: 'General', icon: SettingsIcon, description: 'Basic system settings and preferences' },
  { id: 'account', name: 'Account', icon: User, description: 'User account and profile settings' },
  { id: 'security', name: 'Security', icon: Shield, description: 'Security and authentication settings' },
  { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Notification preferences and channels' },
  { id: 'display', name: 'Display', icon: Monitor, description: 'LED screen and display configurations' },
  { id: 'analytics', name: 'Analytics', icon: Activity, description: 'AI analytics and detection settings' },
  { id: 'network', name: 'Network', icon: Wifi, description: 'Network and connectivity settings' },
  { id: 'backup', name: 'Backup & Restore', icon: Database, description: 'Data backup and system restore options' },
  { id: 'integrations', name: 'Integrations', icon: Globe, description: 'Third-party integrations and APIs' },
  { id: 'maintenance', name: 'Maintenance', icon: Calendar, description: 'System maintenance and scheduling' }
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Hapo Group AI Analytics',
      timezone: 'America/Toronto',
      language: 'English',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      autoSave: true,
      debugMode: false
    },
    account: {
      username: 'admin',
      email: 'admin@hapogroup.com',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'Super Admin',
      lastLogin: '2025-01-08 10:30:00',
      twoFactorEnabled: true,
      sessionTimeout: 30
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        maxAge: 90
      },
      loginAttempts: 5,
      lockoutDuration: 15,
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      sslEnabled: true,
      encryptionLevel: 'AES-256'
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      slackEnabled: false,
      webhookEnabled: false,
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '06:00'
      },
      alertThresholds: {
        critical: 0,
        warning: 5,
        info: 60
      }
    },
    display: {
      defaultBrightness: 80,
      autoAdjustBrightness: true,
      nightMode: {
        enabled: true,
        start: '20:00',
        end: '06:00',
        brightness: 40
      },
      refreshRate: 60,
      colorProfile: 'Standard',
      powerSaving: true
    },
    analytics: {
      peopleDetection: {
        enabled: true,
        confidence: 0.8,
        ageDetection: true,
        genderDetection: true,
        faceBlurring: true
      },
      vehicleDetection: {
        enabled: true,
        confidence: 0.85,
        typeClassification: true,
        speedDetection: true,
        licensePlateRecognition: true
      },
      dataRetention: 90,
      realTimeProcessing: true,
      batchProcessing: false
    },
    network: {
      dhcp: false,
      staticIP: '192.168.1.100',
      subnet: '255.255.255.0',
      gateway: '192.168.1.1',
      dns1: '8.8.8.8',
      dns2: '8.8.4.4',
      port: 8080,
      sslPort: 8443,
      bandwidth: 'unlimited'
    },
    backup: {
      autoBackup: true,
      backupInterval: 'daily',
      backupTime: '02:00',
      retentionDays: 30,
      cloudBackup: false,
      compressionEnabled: true,
      encryptBackups: true
    },
    integrations: {
      apiEnabled: true,
      webhooks: [],
      thirdPartyServices: {
        googleAnalytics: false,
        microsoftPowerBI: false,
        tableau: false,
        slack: false,
        teams: false
      }
    },
    maintenance: {
      autoUpdates: true,
      updateChannel: 'stable',
      maintenanceWindow: {
        enabled: true,
        start: '02:00',
        end: '04:00',
        days: ['sunday']
      },
      healthChecks: true,
      performanceMonitoring: true,
      logLevel: 'info'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const updateNestedSetting = (section: string, parentKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [parentKey]: {
          ...(prev[section as keyof typeof prev] as any)[parentKey],
          [key]: value
        }
      }
    }));
    setUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Simulate API call to save settings
    console.log('Saving settings:', settings);
    setUnsavedChanges(false);
    // Show success message
  };

  const resetSettings = () => {
    // Reset to default values
    setUnsavedChanges(false);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'hapo-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
          <input
            type="text"
            value={settings.general.systemName}
            onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="America/Toronto">America/Toronto</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="English">English</option>
            <option value="French">Français</option>
            <option value="Spanish">Español</option>
            <option value="German">Deutsch</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.general.autoSave}
            onChange={(e) => updateSetting('general', 'autoSave', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Auto-save changes</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.general.debugMode}
            onChange={(e) => updateSetting('general', 'debugMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable debug mode</span>
        </label>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={settings.account.username}
            onChange={(e) => updateSetting('account', 'username', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.account.email}
            onChange={(e) => updateSetting('account', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={settings.account.firstName}
            onChange={(e) => updateSetting('account', 'firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={settings.account.lastName}
            onChange={(e) => updateSetting('account', 'lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Account Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Role:</span>
            <span className="ml-2 font-medium text-gray-900">{settings.account.role}</span>
          </div>
          <div>
            <span className="text-gray-500">Last Login:</span>
            <span className="ml-2 font-medium text-gray-900">{settings.account.lastLogin}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.account.twoFactorEnabled}
              onChange={(e) => updateSetting('account', 'twoFactorEnabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
          </div>
          {settings.account.twoFactorEnabled && (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Enabled</span>
          )}
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.account.sessionTimeout}
            onChange={(e) => updateSetting('account', 'sessionTimeout', parseInt(e.target.value))}
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h4 className="font-semibold text-amber-800">Security Settings</h4>
        </div>
        <p className="text-sm text-amber-700 mt-1">Changes to security settings will affect all users and require system restart.</p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Password Policy</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
            <input
              type="number"
              value={settings.security.passwordPolicy.minLength}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Max Age (days)</label>
            <input
              type="number"
              value={settings.security.passwordPolicy.maxAge}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'maxAge', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireUppercase}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Require uppercase letters</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireLowercase}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireLowercase', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Require lowercase letters</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireNumbers}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Require numbers</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireSymbols}
              onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireSymbols', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Require symbols</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Login Security</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={settings.security.loginAttempts}
              onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
            <input
              type="number"
              value={settings.security.lockoutDuration}
              onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">IP Whitelist</h4>
        <div className="space-y-2">
          {settings.security.ipWhitelist.map((ip, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={ip}
                onChange={(e) => {
                  const newList = [...settings.security.ipWhitelist];
                  newList[index] = e.target.value;
                  updateSetting('security', 'ipWhitelist', newList);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => {
                  const newList = settings.security.ipWhitelist.filter((_, i) => i !== index);
                  updateSetting('security', 'ipWhitelist', newList);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newList = [...settings.security.ipWhitelist, ''];
              updateSetting('security', 'ipWhitelist', newList);
            }}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add IP Range</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.security.sslEnabled}
            onChange={(e) => updateSetting('security', 'sslEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable SSL/TLS</span>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Level</label>
          <select
            value={settings.security.encryptionLevel}
            onChange={(e) => updateSetting('security', 'encryptionLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="AES-128">AES-128</option>
            <option value="AES-256">AES-256</option>
            <option value="RSA-2048">RSA-2048</option>
            <option value="RSA-4096">RSA-4096</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">People Detection</h4>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.analytics.peopleDetection.enabled}
              onChange={(e) => updateNestedSetting('analytics', 'peopleDetection', 'enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable people detection</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detection Confidence: {(settings.analytics.peopleDetection.confidence * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={settings.analytics.peopleDetection.confidence}
              onChange={(e) => updateNestedSetting('analytics', 'peopleDetection', 'confidence', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.peopleDetection.ageDetection}
                onChange={(e) => updateNestedSetting('analytics', 'peopleDetection', 'ageDetection', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Age detection</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.peopleDetection.genderDetection}
                onChange={(e) => updateNestedSetting('analytics', 'peopleDetection', 'genderDetection', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Gender detection</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.peopleDetection.faceBlurring}
                onChange={(e) => updateNestedSetting('analytics', 'peopleDetection', 'faceBlurring', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Face blurring (privacy)</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Vehicle Detection</h4>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.analytics.vehicleDetection.enabled}
              onChange={(e) => updateNestedSetting('analytics', 'vehicleDetection', 'enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable vehicle detection</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detection Confidence: {(settings.analytics.vehicleDetection.confidence * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={settings.analytics.vehicleDetection.confidence}
              onChange={(e) => updateNestedSetting('analytics', 'vehicleDetection', 'confidence', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.vehicleDetection.typeClassification}
                onChange={(e) => updateNestedSetting('analytics', 'vehicleDetection', 'typeClassification', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Vehicle type classification</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.vehicleDetection.speedDetection}
                onChange={(e) => updateNestedSetting('analytics', 'vehicleDetection', 'speedDetection', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Speed detection</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.analytics.vehicleDetection.licensePlateRecognition}
                onChange={(e) => updateNestedSetting('analytics', 'vehicleDetection', 'licensePlateRecognition', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">License plate recognition</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Data Processing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
            <input
              type="number"
              value={settings.analytics.dataRetention}
              onChange={(e) => updateSetting('analytics', 'dataRetention', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.analytics.realTimeProcessing}
              onChange={(e) => updateSetting('analytics', 'realTimeProcessing', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Real-time processing</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.analytics.batchProcessing}
              onChange={(e) => updateSetting('analytics', 'batchProcessing', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Batch processing</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'account': return renderAccountSettings();
      case 'security': return renderSecuritySettings();
      case 'analytics': return renderAnalyticsSettings();
      default:
        return (
          <div className="text-center py-12">
            <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {settingsSections.find(s => s.id === activeSection)?.name} Settings
            </h3>
            <p className="text-gray-600">This section is under development. More settings coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your system preferences and options</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{section.name}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {settingsSections.find(s => s.id === activeSection)?.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {settingsSections.find(s => s.id === activeSection)?.description}
                </p>
              </div>
              
              {unsavedChanges && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-amber-600">Unsaved changes</span>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {renderContent()}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={exportSettings}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors duration-200">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={resetSettings}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={saveSettings}
                  disabled={!unsavedChanges}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors duration-200 ${
                    unsavedChanges
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}