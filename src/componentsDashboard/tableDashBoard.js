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

export function TableData() {
  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">List of enroled devices</h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Device</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.device}>
              <TableCell>{item.device}</TableCell>
              <TableCell>
                {item.Role}
              </TableCell>
              <TableCell>
                {item.departement}
              </TableCell>
              <TableCell>
                <Badge color="emerald" icon={RiFlag2Line}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}