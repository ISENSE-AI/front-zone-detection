import React, { useState, useEffect, useMemo } from 'react';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

const GridGif = ({ dateRange, deviceId }) => {
  const [faulDevices, setFaulDevices] = useState([]);
  const connect = useMemo(() => new Connect(), []);
  const user = useUser();

  useEffect(() => {
    const fetchFaulDevices = async () => {
      if (!user.user.institutionId) {
        // Si no hay institutionId, no hacer la consulta
        return;
      }

      try {
        let fetchPromises;

        if (dateRange && dateRange.length > 0) {
          // Crear una lista de promesas para cada fecha en `dateRange`
          fetchPromises = dateRange.map(date => {
            const queryParams = {
              institutionId: `${user.user.institutionId}`,
              date: date, // Añadir la fecha a los parámetros de consulta
              deviceId: deviceId
            };
            return connect.get('/faulDevice', queryParams);
          });
        } else {
          // Si `dateRange` es null o vacío, hacer una consulta sin el parámetro de fecha
          const queryParams = {
            institutionId: `${user.user.institutionId}`
          };
          fetchPromises = [connect.get('/faulDevice', queryParams)];
        }

        // Ejecutar todas las promesas simultáneamente
        const responses = await Promise.all(fetchPromises);

        // Combinar todos los dispositivos obtenidos en una sola lista
        const allFaulDevices = responses.flat(); // `flat()` combina los arrays en uno solo

        // Actualizar el estado con todos los dispositivos
        setFaulDevices(allFaulDevices);
      } catch (error) {
        console.error("Error al cargar dispositivos:", error);
      }
    };

    fetchFaulDevices();
  }, [connect, user.user.institutionId, dateRange, deviceId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {faulDevices.length > 0 ? (
        faulDevices.map((faulDevice, index) => (
          <div key={index} className="bg-gray-800 p-2 rounded-lg shadow-md">
            <h2 className="text-white mb-2">{`Device ${faulDevice.deviceId} time ${faulDevice.hour}`}</h2>
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
