"use client";

import GridGif from "@/components/gridGif";
import Navbar from "@/components/NavBar";
import Calendar from "@/components/calendar";
import { useEffect, useState, useMemo } from "react";
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';
import { Select } from "@/components/select";


export default function Profile() {
    const [dateRange, setDateRange] = useState('');
    const [deviceId, setDeviceId] = useState('');

    const connect = useMemo(() => new Connect(), []);
    const user = useUser();

    useEffect(() => {
        console.log(dateRange);
    }, [dateRange]);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen min-w-full bg-blue-100 p-6 sm:p-10">
                <div className="w-full sm:w-1/3">
                    <Select setDeviceId={setDeviceId} />
                </div>
                <Calendar setDateRange={setDateRange} />
                <GridGif dateRange={dateRange} deviceId={deviceId} />
            </main>
        </>
    );
}
