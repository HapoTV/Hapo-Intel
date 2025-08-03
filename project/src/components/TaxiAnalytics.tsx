import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface TaxiUnit {
  id: string;
  driverName: string;
  vehicleNumber: string;
  status: 'active' | 'inactive';
  analytics: {
    distanceTraveled: number;
    peopleDetected: number;
    vehiclesDetected: number;
  };
  route: {
    earnings: number;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
    speed?: number;
    heading?: number;
  };
  ipWebcam?: {
    enabled: boolean;
    ipAddress: string;
    port: string;
    streamUrl: string;
    connectionStatus: 'connected' | 'disconnected';
  };
}

const TaxiAnalytics: React.FC = () => {
  const [taxiUnits, setTaxiUnits] = useState<TaxiUnit[]>([]);

  useEffect(() => {
    const initialTaxis: TaxiUnit[] = [
      {
        id: 'TX-4521',
        driverName: 'Ahmed Hassan',
        vehicleNumber: 'TX-4521',
        status: 'active',
        analytics: {
          distanceTraveled: 220,
          peopleDetected: 380,
          vehiclesDetected: 180,
        },
        route: {
          earnings: 1250,
        },
        location: {
          lat: 43.65,
          lng: -79.38,
          address: 'Toronto, ON',
        },
        ipWebcam: {
          enabled: true,
          ipAddress: '192.168.5.251',
          port: '8080',
          streamUrl: 'http://192.168.5.251:8080/video',
          connectionStatus: 'connected'
        }
      },
      {
        id: 'TX-2156',
        driverName: 'Lerato Mokoena',
        vehicleNumber: 'TX-2156',
        status: 'active',
        analytics: {
          distanceTraveled: 140,
          peopleDetected: 270,
          vehiclesDetected: 160,
        },
        route: {
          earnings: 910,
        },
        location: {
          lat: 43.66,
          lng: -79.39,
          address: 'Toronto, ON',
        },
        ipWebcam: {
          enabled: true,
          ipAddress: '192.168.5.252',
          port: '8080',
          streamUrl: 'http://192.168.5.252:8080/video',
          connectionStatus: 'connected'
        }
      },
      {
        id: 'TX-9988',
        driverName: 'Zama Ndlovu',
        vehicleNumber: 'TX-9988',
        status: 'inactive',
        analytics: {
          distanceTraveled: 0,
          peopleDetected: 0,
          vehiclesDetected: 0,
        },
        route: {
          earnings: 0,
        },
        location: {
          lat: 0,
          lng: 0,
          address: 'Not Available',
        }
      }
    ];
    setTaxiUnits(initialTaxis);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Taxi Analytics</h1>

      {/* Render each taxi unit */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {taxiUnits.map((taxi) => (
          <div key={taxi.id} className="bg-white rounded-xl shadow-md border p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{taxi.vehicleNumber}</h2>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  taxi.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {taxi.status.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-500">Driver: {taxi.driverName}</p>
            <p className="text-sm text-gray-500">Location: {taxi.location.address}</p>

            <div className="text-sm text-gray-700">
              <p><strong>Distance:</strong> {taxi.analytics.distanceTraveled} km</p>
              <p><strong>Earnings:</strong> R{taxi.route.earnings}</p>
              <p><strong>Detections:</strong> {taxi.analytics.peopleDetected + taxi.analytics.vehiclesDetected}</p>
            </div>

            {/* Show live webcam if available */}
            {taxi.ipWebcam?.enabled && taxi.ipWebcam.streamUrl && (
              <div className="border rounded-md overflow-hidden mt-2">
                <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Live Camera
                </h3>
                <iframe
                  src={taxi.ipWebcam.streamUrl}
                  title={`Webcam for ${taxi.vehicleNumber}`}
                  width="100%"
                  height="250"
                  allow="autoplay"
                  className="rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxiAnalytics;
