import React, { useState, useEffect } from 'react';

const Info = () => {
    const [dateTime, setDateTime] = useState({
        date: '',
        day: '',
        time: ''
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const optionsTime = { hour: '2-digit', minute: '2-digit' };

            setDateTime({
                date: now.toLocaleDateString('en-US', optionsDate),
                day: now.toLocaleDateString('en-US', { weekday: 'long' }),
                time: now.toLocaleTimeString('en-US', optionsTime)
            });
        };

        // Initial update
        updateDateTime();

        // Update every minute
        const intervalId = setInterval(updateDateTime, 60000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="info">
            <div className="date">{dateTime.date}</div>
          
            <div className="time">{dateTime.time}</div>
        </div>
    );
};

export default Info; 