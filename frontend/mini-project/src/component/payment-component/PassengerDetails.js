import React, { useState } from 'react';
import '../../css/payment.css';

const PassengerDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="passenger-details">
      <div className="passenger-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>Passenger 1</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="passenger-form">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="text" placeholder="Phone number" />
          <input type="email" placeholder="Email" />
        </div>
      )}
    </div>
  );
};

export default PassengerDetails;
