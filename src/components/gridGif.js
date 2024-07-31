import React, { useState, useEffect, useMemo } from 'react';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

const GridGif = () => {
  const [faulDevices, setFaulDevices] = useState([]);
  const connect = useMemo(() => new Connect(), []);
  const user = useUser();

  useEffect(() => {
    const fetchFaulDevices = async () => {
      try {
        const queryParams = {
          institutionId: `${user.user.institutionId}`
        };
        const response = await connect.get('/faulDevice', queryParams);
        setFaulDevices(response); // Asume que `response` es un array de faulDevices
      } catch (error) {
        console.error("Error al cargar dispositivos:", error);
      }
    };

    fetchFaulDevices();
  }, [connect, user.user.institutionId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {faulDevices.length > 0 ? (
        faulDevices.map((faulDevice, index) => (
          <div key={index} className="bg-gray-800 p-2 rounded-lg shadow-md">
            <h2 className="text-white mb-2">{`Device ${faulDevice.deviceId}`}</h2>
            <img src={faulDevice.pathGif} alt={`Gif for device ${faulDevice.deviceId}`} className="rounded" />
          </div>
        ))
      ) : (
        <p>No GIFs available.</p>
      )}
    </div>
  );
};

export default GridGif;
