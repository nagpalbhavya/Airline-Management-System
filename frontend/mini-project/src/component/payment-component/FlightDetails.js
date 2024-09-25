// import React from 'react';
// import '../App.css';

// const FlightDetails = () => {
//   return (
//     <div className="flight-details">
//       <div className="flight-info">
//         <img src="flight-logo.png" alt="Flight Logo" className="flight-logo" />
//         <div className="flight-type">ECONOMY</div>
//       </div>
//       <div className="date-time">
//         <p>Departure Date</p>
//         <h3>12 Oct, 2024, FRI</h3>
//         <p>10:15</p>
//         <span>Direct | Duration: 3h 30m</span>
//       </div>
//       <div className="arrival">
//         <p>Arrival Date</p>
//         <h3>12 Oct, 2024, FRI</h3>
//         <p>12:45</p>
//       </div>
//       <div className="baggage-details">
//         <p>Cabin: 7 Kgs | Check-in: 15 Kgs</p>
//       </div>
//     </div>
//   );
// };

// export default FlightDetails;
import React from 'react';
import { Card } from 'react-bootstrap';

const FlightDetails = () => {
  return (
    <div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '22px',boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
      <div style={{ display: 'flex',justifyContent: 'space-between'}}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#003580' }}>IndiGo</h1>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#003580'  }}>ECONOMY</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <p style={{ fontSize: '18px', color: 'gray'}}>Departure Date</p>
          <p style={{ fontSize: '16px', color: 'black',fontWeight:'bold' }}>12 Oct, 2024, FRI</p>
        </div>
        <div>
          <p style={{ fontSize: '18px', color: 'gray' }}>Arrival Date</p>
          <p style={{ fontSize: '16px', color: 'black',fontWeight:'bold' }}>12 Oct, 2024, FRI</p>
        </div>
      </div>
      <Card style={{ border: 'none', marginBottom: '10px' }}>
        <Card.Body style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#003580' }}>10:15</h2>
            <p style={{ fontSize: '16px', color: 'gray' }}>BRL</p>
          </div>
          <div style={{ fontSize: '16px', color: 'black', fontWeight:'bold',textAlign:'center'}}>
            <p>Direct</p>
            <hr style={{ border: '2px dashed #ccc' }} />
            <p>Duration: 3h 30m</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#003580' }}>12:45</h2>
            <p style={{ fontSize: '16px', color: 'gray' }}>DEL</p>
          </div>
        </Card.Body>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '20px', fontWeight:'bold',color:'#003580' }}>Baggage Details</p>
          <p style={{ fontSize: '14px', fontWeight:'bold', color: 'black' }}>Cabin: 7 Kg  </p>
          <p style={{ fontSize: '14px', fontWeight:'bold',color: 'black' }}> Check-in: 15 Kg</p>
        
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;