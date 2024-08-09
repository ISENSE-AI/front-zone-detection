import { Select, SelectItem } from '@tremor/react';

export default function SelectHero({ selectData, setData }) {
  // Manejador de cambio para el select
  const handleValueChange = (value) => {
    console.log(value)
    setData(value);
  };

  return (
    <div className="grid gap-6">
      <Select
        onValueChange={handleValueChange}
        placeholder="Select a device"
      >
        
        {/* Options for devices */}
        {selectData.map((item) => (
          <SelectItem key={item.deviceId} value={item.deviceId}>
            {item.deviceName}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
