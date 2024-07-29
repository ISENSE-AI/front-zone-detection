"use client";
import React, { useState, useMemo } from 'react';
import { Button } from '@tremor/react';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

const ModalDevice = ({ isOpen, onClose }) => {
  const user = useUser();
  const [data, setData] = useState({
    pointsPolygon: [0], // Inicializa el campo con [0]
    deviceName: '',
    position: '',
    sucursal: '',
    status: 'Disabled', // Inicializa el estado a "Disabled"
    streamingLink: '',
    pathFrame: '',
  });

  const connect = useMemo(() => new Connect(), []);
  const institutionId = user.user.institutionId;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const deviceData = { ...data, institutionId };
      const response = await connect.post('/device', deviceData);
      console.log(response);

      if (response.status === 201) {
        onClose();
        // Recargar la página o actualizar la lista de dispositivos
      } else {
        console.error('Error al agregar dispositivo');
      }
    } catch (error) {
      console.error('Error al agregar dispositivo:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Agregar Dispositivo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Dispositivo
            </label>
            <input
              type="text"
              name="deviceName"
              value={data.deviceName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Posición
            </label>
            <input
              type="text"
              name="position"
              value={data.position}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sucursal
            </label>
            <input
              type="text"
              name="sucursal"
              value={data.sucursal}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enlace de Streaming
            </label>
            <input
              type="text"
              name="streamingLink"
              value={data.streamingLink}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Path Frame
            </label>
            <input
              type="text"
              name="pathFrame"
              value={data.pathFrame}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button type="submit" variant="primary">
            Agregar Dispositivo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalDevice;
