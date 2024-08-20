import { SearchSelect, SearchSelectItem, Title } from '@tremor/react';
import React, { useState, useEffect, useMemo } from 'react';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

export function Select({ setDeviceId }) {
  const [devices, setDevices] = useState([]);
  const connect = useMemo(() => new Connect(), []);
  const user = useUser();

  useEffect(() => {
    const fetchDevices = async () => {
      if (!user.user.institutionId) {
        return;
      }
      try {
        const queryParams = {
          institutionId: `${user.user.institutionId}`
        };
        const response = await connect.get('/device', queryParams);
        setDevices(response);
      } catch (error) {
        console.error('Error al cargar dispositivos:', error);
      }
    };

    fetchDevices();
  }, [user.user.institutionId, connect]);

  return (
    <div className="grid gap-6">
      <Title>Select Device</Title>
      <SearchSelect onValueChange={value => setDeviceId(value)}>
        {/* Opción 'Cualquiera' */}
        <SearchSelectItem value="">
          Any
        </SearchSelectItem>
        {/* Opciones dinámicas de dispositivos */}
        {devices.map(device => (
          <SearchSelectItem key={device.deviceId} value={device.deviceId}>
            {device.deviceName}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
}
