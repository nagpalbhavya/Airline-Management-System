
import React, { useState, useEffect } from 'react';
//import '../css/TimeDisplay.css';  // Ensure CSS is imported
import '../App.css';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());  // Updates the time every second
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = time.toLocaleString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    <div className="time-date-container" > 
      <div className="date-container">
        {formattedDate}  
      </div>
      <div className="time-container">
        {formattedTime}  
      </div>
    </div>
  );
};

export default TimeDisplay;
