import React, { useState } from 'react';
import '../../css/flight-detail.css';

const PassengerDetails = ({index, passenger, onPassengerChange}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange=(e)=>{
    const {name, value}=e.target;
    onPassengerChange(index,{...passenger,[name]:value})
  }
  return (
    <div className="detail-passenger-details" style={{backgroundColor:'#007bff', color:'white', padding:'20px'}}>
      <div className="detail-passenger-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 style={{fontSize:'24px'}}>Passenger {index+1}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="detail-passenger-form">
          <input type="text" name="name" placeholder="full name" value={passenger.name} onChange={handleChange}/>
          <input type="email" name="email" placeholder="email" value={passenger.email} onChange={handleChange}/>
        </div>
      )}
    </div>
  );
};

export default PassengerDetails;
