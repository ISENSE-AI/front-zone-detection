import React, { useEffect, useState, useMemo } from 'react';
import { RiFlag2Line, RiDeleteBinLine, RiEdit2Line } from '@remixicon/react';
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button
} from '@tremor/react';

import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

export function TableData({ setEditDevice, onChangeArea }) {
  const [devices, setDevices] = useState([]);
  const user = useUser();
  const connect = useMemo(() => new Connect(), []);

  const fetchDevices = async () => {
    try {
      const queryParams = {
        institutionId: `${user.user.institutionId}`
      };
      const response = await connect.get('/device', queryParams);
      setDevices(response); // Actualiza el estado con la respuesta del API
    } catch (error) {
      console.error("Error al cargar dispositivos:", error);
    }
  };

  const handleChangeArea = (device) => {
    setEditDevice(device); // Establece el dispositivo completo para editar
    onChangeArea(); // Llama a la función para abrir el panel lateral
  };

  useEffect(() => {
    fetchDevices();
  }, [user.user.institutionId]);

  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">List of enroled devices</h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Device</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Sucursal</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.deviceId}>
              <TableCell>{device.deviceName}</TableCell>
              <TableCell>
                {device.position}
              </TableCell>
              <TableCell>
                {device.sucursal}
              </TableCell>
              <TableCell>
                <Badge color={device.status === 'Enabled' ? 'emerald' : 'red'} icon={RiFlag2Line}>
                  {device.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="secondary" icon={RiEdit2Line} onClick={() => handleChangeArea(device)}>
                  Change Area
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
