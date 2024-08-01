import React from 'react';
import { DateRangePicker } from '@tremor/react';

export default function Calendar({ setDateRange }) {
    const handleDateChange = (value) => {
        console.log(value);
        if (value && value.from && value.to) {
            const dates = getDatesBetween(new Date(value.from), new Date(value.to));
            console.log(dates);
            setDateRange(dates);
        }
    };

    const formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        let year = date.getFullYear();
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const getDatesBetween = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(formatDate(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    return (
        <div className="grid gap-6">
            <DateRangePicker className='w-64' onValueChange={handleDateChange} />
        </div>
    );
}
