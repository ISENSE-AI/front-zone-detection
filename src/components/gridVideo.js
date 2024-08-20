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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {streams.length > 0 ? (
        streams.map((stream, index) => (
          <div key={index} className="relative mt-6">
            <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2 bg-white p-2 rounded-lg shadow-md border border-gray-200 text-center">
              <h2 className="text-gray-800 font-semibold text-lg">{stream.deviceName || `Stream ${index + 1}`}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <Stream src={stream.streamingLink || ''} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No streams available.</p>
      )}
    </div>
  );
};

export default Grid;
