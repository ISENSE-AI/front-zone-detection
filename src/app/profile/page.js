"use client";
import { Card } from "@tremor/react";
import GridGif from "@/components/gridGif";
import Navbar from "@/components/NavBar";
import Calendar from "@/components/calendar";
import Select from "@/components/select";
import Connect from "@/connect/Connect";
import { useEffect, useState, useMemo } from "react";
import { useUser }  from '@/userContext'; // Asumiendo que tienes este hook para obtener el usuario

export default function Profile() {
    const [dateRange, setDateRange] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState('');

    const connect = useMemo(() => new Connect(), []);
    const user = useUser();

    // Función para obtener la lista de dispositivos
    const fetchDevices = async () => {
        if (!user?.user?.institutionId) {
            // Si no hay institutionId, no hacer la consulta
            return;
        }

        try {
            const queryParams = {
                institutionId: `${user.user.institutionId}`
            };

            const response = await connect.get('/device', queryParams);

            setDeviceList(response);
        } catch (e) {
            console.error("Error al obtener la lista de dispositivos:", e);
        }
    };

    useEffect(() => {
        fetchDevices(); // Llamar a la función para obtener los dispositivos
        console.log(dateRange);
    }, [dateRange,deviceId]);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen min-w-full bg-blue-100 p-6 sm:p-10">
            <Card className="flex flex-row items-center p-4 w-2/5 mx-auto mt-6 p-4 gap-x-4">
                <Select selectData={deviceList} setData={setDeviceId} className="mr-4" />
                <Calendar setDateRange={setDateRange} />
            </Card>
            
            <GridGif dateRange={dateRange} deviceId={deviceId} />
            </main>
            
            
        </>
    );
}
