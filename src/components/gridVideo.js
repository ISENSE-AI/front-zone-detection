import React, { useState, useEffect, useMemo } from 'react';
import Stream from "./stream";
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

const Grid = () => {
  const [streams, setStreams] = useState([]);
  const connect = useMemo(() => new Connect(), []);
  const user = useUser();

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const queryParams = {
          institutionId: `${user.user.institutionId}`
        };
        const response = await connect.get('/device', queryParams);
        setStreams(response); // Asume que `response` es un array de streams
      } catch (error) {
        console.error("Error al cargar dispositivos:", error);
      }
    };

    fetchStreams();
  }, [connect, user.user.institutionId]); // Dependencias para el efecto

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {streams.length > 0 ? (
        streams.map((stream, index) => (
          <div key={index} className="bg-gray-800 p-2 rounded-lg shadow-md">
            <h2 className="text-white mb-2">{stream.deviceName || `Stream ${index + 1}`}</h2>
            <Stream src={stream.streamingLink || ''} />
          </div>
        ))
      ) : (
        <p className="text-white">No streams available.</p>
      )}
    </div>
  );
};

export default Grid;
