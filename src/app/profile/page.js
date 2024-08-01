"use client";

import GridGif from "@/components/gridGif";
import Navbar from "@/components/NavBar";
import Calendar from "@/components/calendar";
import { useEffect, useState } from "react";

export default function Profile() {
    const [dateRange, setDateRange] = useState('');

    useEffect(() => {
        console.log(dateRange);
    }, [dateRange]);

    return (
        <>
            <Navbar />
            <Calendar setDateRange={setDateRange} />
            <GridGif dateRange = {dateRange} />
        </>
    );
}
