import React, { useState, useEffect, useMemo } from 'react';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

const GridGif = ({ dateRange, deviceId}) => {
  const [faulDevices, setFaulDevices] = useState([]);
  const connect = useMemo(() => new Connect(), []);
  const user = useUser();

  useEffect(() => {
    const fetchFaulDevices = async () => {
      if (!user.user.institutionId) {
        return;
      }
  
      try {
        let fetchPromises;
  
        if (dateRange && dateRange.length > 0) {
          fetchPromises = dateRange.map(date => {
            const queryParams = {
              institutionId: `${user.user.institutionId}`,
              date: date
            };
  
            if (deviceId) { // Verifica si deviceId no es un string vacío o undefined
              queryParams.deviceId = deviceId;
            }
  
            return connect.get('/faulDevice', queryParams);
          });
        } else {
          const queryParams = {
            institutionId: `${user.user.institutionId}`
          };
          fetchPromises = [connect.get('/faulDevice', queryParams)];
        }
  
        const responses = await Promise.all(fetchPromises);
        const allFaulDevices = responses.flat();
        setFaulDevices(allFaulDevices);
      } catch (error) {
        console.error("Error al cargar dispositivos:", error);
      }
    };
  
    fetchFaulDevices();
  }, [connect, user.user.institutionId, dateRange, deviceId]);
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {faulDevices.length > 0 ? (
        faulDevices.map((faulDevice, index) => (
          <div key={index} className="relative mt-6">
            <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2 bg-white p-2 rounded-lg shadow-md border border-gray-200 text-center">
              <h2 className="text-gray-800 font-semibold text-lg">{`${faulDevice.deviceName} date ${faulDevice.date} time ${faulDevice.hour}`}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <img src={faulDevice.pathGif} alt={`Gif for device ${faulDevice.deviceId}`} className="rounded" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No GIFs available.</p>
      )}
    </div>
  );
};

export default GridGif;
