# Hapo Group AI Analytics Dashboard

A comprehensive real-time analytics dashboard for LED screen networks with AI-powered people and vehicle detection capabilities.

## 🚀 Features

### Core Analytics
- **People Detection & Analytics** - Real-time pedestrian traffic monitoring with demographic insights
- **Vehicle Traffic Analysis** - Vehicle classification, speed detection, and traffic flow analytics
- **Taxi Analytics** - Specialized taxi tracking with IP webcam integration
- **LED Screen Management** - Monitor and control your LED screen network
- **Live Metrics Dashboard** - Real-time data visualization and monitoring

### Advanced Capabilities
- **IP Webcam Integration** - Connect to Android IP webcam for live video analytics
- **Real-time Object Detection** - AI-powered detection with confidence scoring
- **License Plate Recognition** - Automatic license plate detection and logging
- **Multi-location Monitoring** - Manage multiple screen locations simultaneously
- **Alert Management** - Comprehensive alert system with customizable rules

### Data Management
- **Export & Reporting** - Generate detailed analytics reports in multiple formats
- **Data Backup & Archival** - Automated backup with retention policies
- **Security Center** - User access control and security monitoring
- **Notification System** - Multi-channel notifications (email, SMS, push, Slack)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)
- Android phone with IP Webcam app (for taxi analytics)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd hapo-analytics-dashboard
npm install
```

### 2. Environment Setup
Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
The project includes comprehensive database migrations in `/supabase/migrations/`. Run these to set up your database schema.

### 4. Start Development Server
```bash
npm run dev
```

## 📱 IP Webcam Setup (for Taxi Analytics)

### Android Setup
1. Install "IP Webcam" app from Google Play Store
2. Connect your phone to the same WiFi network as your computer
3. Open the IP Webcam app
4. Configure settings:
   - Video resolution: 720p or higher
   - Quality: 80%
   - FPS: 30
5. Tap "Start server"
6. Note the IP address displayed (e.g., 192.168.5.252)

### Dashboard Configuration
1. Navigate to "Taxi Analytics" section
2. Enter your webcam URL: `http://192.168.5.252:8080/video`
3. Set target taxi ID (e.g., "TX-2156")
4. Click "Connect to Webcam"
5. Start analytics to begin real-time detection

## 🎯 Key Components

### Dashboard Sections
- **Overview** - Main analytics dashboard with key metrics
- **People Analytics** - Detailed pedestrian traffic analysis
- **Vehicle Analytics** - Vehicle detection and classification
- **Taxi Analytics** - Specialized taxi tracking with IP webcam
- **Camera Management** - Live camera feeds and controls
- **LED Screens** - Screen network management and monitoring
- **Alerts** - Alert management and notification rules
- **Reports** - Analytics report generation and export
- **Security** - User access control and security monitoring
- **Data Management** - Data sources, backups, and policies

### Core Features
- **Real-time Detection** - Live AI-powered object detection
- **Multi-screen Support** - Manage multiple LED screen locations
- **Analytics Export** - Export data in CSV, Excel, PDF, JSON formats
- **Automated Reporting** - Scheduled report generation
- **Alert System** - Customizable alerts with multiple notification channels
- **User Management** - Role-based access control

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema including:

### Core Tables
- `stores` - LED screen locations and metadata
- `tracks` - Audio/video content for screens
- `playlists` - Content playlists and scheduling
- `advertisements` - Advertisement content and scheduling
- `traffic_data` - People and vehicle detection data
- `vehicle_detections` - Detailed vehicle analytics
- `subscribers` - User subscription management

### Analytics Tables
- `content_engagement` - Content performance metrics
- `listening_stats` - User engagement statistics
- `search_analytics` - Search behavior analysis
- `schedule_logs` - Content scheduling logs

### Management Tables
- `emergency_overrides` - Emergency content override system
- `ad_schedules` - Advertisement scheduling
- `maintenance_logs` - System maintenance tracking

## 🔧 Configuration

### Detection Settings
```typescript
const detectionSettings = {
  confidence: 0.8,           // Detection confidence threshold
  trackingEnabled: true,     // Enable object tracking
  plateRecognition: true,    // License plate recognition
  passengerCounting: true,   // Count passengers in vehicles
  speedDetection: true       // Calculate vehicle speeds
};
```

### Notification Channels
- Email notifications
- SMS alerts
- Push notifications
- Slack integration
- Custom webhooks

## 📈 Analytics Capabilities

### People Analytics
- Real-time pedestrian counting
- Age and gender demographics
- Dwell time analysis
- Peak hour identification
- Location-based insights

### Vehicle Analytics
- Vehicle type classification (cars, trucks, motorcycles, buses)
- Speed detection and analysis
- License plate recognition
- Traffic flow patterns
- Route efficiency metrics

### Performance Metrics
- Detection accuracy monitoring
- System uptime tracking
- Hardware health monitoring
- Network connectivity status

## 🔒 Security Features

- **Authentication** - Secure user login with Supabase Auth
- **Row Level Security** - Database-level access controls
- **Audit Logging** - Comprehensive activity logging
- **Data Encryption** - Encrypted data storage and transmission
- **Access Control** - Role-based permissions system

## 📱 Mobile Compatibility

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Large displays

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
The project is configured for easy deployment to Netlify with automatic builds.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is proprietary software owned by Hapo Group.

## 🆘 Support

For technical support or questions:
- Email: support@hapogroup.com
- Documentation: [Internal Wiki]
- Issue Tracker: [Internal System]

## 🔄 Version History

### v2.1.0 (Current)
- Added taxi analytics with IP webcam integration
- Enhanced vehicle detection capabilities
- Improved real-time processing
- Added comprehensive export functionality
- Enhanced security features

### v2.0.0
- Complete dashboard redesign
- Added multi-location support
- Implemented real-time analytics
- Added alert management system

### v1.0.0
- Initial release
- Basic LED screen monitoring
- Simple analytics dashboard

## 🎯 Roadmap

### Upcoming Features
- Machine learning model improvements
- Advanced predictive analytics
- Mobile app companion
- API integrations with third-party systems
- Enhanced reporting capabilities

---

**© 2025 Hapo Group. All rights reserved.**
