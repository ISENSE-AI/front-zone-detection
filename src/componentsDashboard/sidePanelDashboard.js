import React, { useEffect, useState, useMemo } from 'react';
import Connect from '@/connect/Connect';

export function SideBarDashboard({ isOpen, onClose, editDevice }) {
  const [device, setDevice] = useState(null);
  const [pixels, setPixels] = useState([]);
  const connect = useMemo(() => new Connect(), []);

  useEffect(() => {
    console.log('Editing device:', editDevice); // Añade este log para verificar el dispositivo que se está editando
    setDevice(editDevice);
    setPixels([]); // Resetea los puntos cuando se abre un nuevo dispositivo
  }, [editDevice]);

  if (!isOpen) return null;

  const handleImageClick = (e) => {
    if (pixels.length >= 4) return; // Solo permite seleccionar hasta 4 puntos

    // Obtener la posición del clic en relación con la imagen
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Agregar el nuevo punto a la lista
    setPixels([...pixels, `${Math.round(x)},${Math.round(y)}`]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevice({
      ...device,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (!device || !device.deviceId) return;

    try {
      const data = {
        ...device,
        pointsPolygon: pixels
      };
      const response = await connect.update(`/device/${device.deviceId}`, data);
      if (response.status !== 500 && response.status !== 404) {
        alert('Device updated successfully!');
        onClose(); // Cierra el panel después de guardar los cambios
      } else {
        console.error('Error updating device:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const pixelsString = pixels.join(", ");

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white w-80 p-4 shadow-lg relative max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Device</h2>
        {device ? (
          <div>
            <div className="mb-4 relative">
              <img 
                src={device.pathFrame} 
                alt="Device View" 
                className="w-full h-auto cursor-crosshair object-contain" 
                onClick={handleImageClick} 
              />
              {/* Mostrar los puntos seleccionados */}
              {pixels.map((point, index) => (
                <div 
                  key={index} 
                  className="absolute rounded-full bg-red-500"
                  style={{
                    left: `${point.split(',')[0]}px`,
                    top: `${point.split(',')[1]}px`,
                    width: '10px',
                    height: '10px',
                  }}
                />
              ))}
            </div>
            <p><strong>Selected Points:</strong> {pixelsString}</p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Device Name</label>
                <input 
                  type="text" 
                  name="deviceName" 
                  value={device.deviceName || ''} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Position</label>
                <input 
                  type="text" 
                  name="position" 
                  value={device.position || ''} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <input 
                  type="text" 
                  name="sucursal" 
                  value={device.sucursal || ''} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </form>
            {/* Botón para guardar cambios */}
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        ) : (
          <p>No device selected</p>
        )}
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
