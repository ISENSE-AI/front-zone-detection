import React, { useEffect, useState, useMemo } from 'react';
import { RiFlag2Line } from '@remixicon/react';
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';
/*
const data = [
  {
    device: 'Bodega',
    Role: 'central principal',
    departement:
      'recursos humanos',
    status: 'active',
  },
  {
    device: 'Jardin',
    Role: 'central principal',
    departement:
      'TI',
    status: 'active',
  },
  {
    device: 'Bodega 2',
    Role: 'central principal',
    departement: 'TI',
    status: 'active',
  },
  {
    device: 'Entrada Principal',
    Role: 'central principal',
    departement: 'Seguridad',
    status: 'active',
  },
  {
    device: 'Garaje',
    Role: 'central principal',
    departement: 'TI',
    status: 'active',
  },
  {
    device: 'Pasillo',
    Role: 'central principal',
    departement:
      'TI',
    status: 'active',
  },
  {
    device: 'Sala',
    Role: 'central principal',
    departement: 'TI',
    status: 'active',
  },
];
*/

export function TableData() {

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
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((devices) => (
            <TableRow key={devices.Name}>
              <TableCell>{devices.deviceName}</TableCell>
              <TableCell>
                {devices.position}
              </TableCell>
              <TableCell>
                {devices.sucursal}
              </TableCell>
              <TableCell>
                <Badge color={devices.status === 'Enabled' ? 'emerald' : 'red'} icon={RiFlag2Line}>
                  {devices.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}