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
import { useSelector } from 'react-redux';


const FlightDetails = (props) => {

  const airports=useSelector((state)=>state.airport.airports)

  const calculateFlightDuration=(departure,arrival)=>{
    const [depHours, depMinutes]=departure.split(':').map(Number);
    const [arrHours, arrMinutes]=arrival.split(':').map(Number);

    const departureTime=new Date();
    departureTime.setHours(depHours, depMinutes,0)

    const arrivalTime=new Date();
    arrivalTime.setHours(arrHours,arrMinutes,0)

    if(arrivalTime<departureTime)
    {
        arrivalTime.setDate(arrivalTime.getDate()+1);
    }

    const durationInMinutes=(arrivalTime-departureTime)/60000;

    console.log(durationInMinutes)

    const hours=Math.floor(durationInMinutes/60);
    const minutes=durationInMinutes%60;

    return `${hours} ${hours>1?'hours':'hour'} ${minutes} ${minutes>1?'minutes':'minute'}`
  }


  const flight=props.data.flight
  const formData=props.data.formData
  return (
    <div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '22px',boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
      <div style={{ display: 'flex',justifyContent: 'space-between'}}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#003580' }}>{flight.airlineImage}</h1>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#003580'  }}>{formData.travelClass}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <p style={{ fontSize: '18px', color: 'gray'}}>Departure Date</p>
          <p style={{ fontSize: '16px', color: 'black',fontWeight:'bold' }}>{flight.departure_date}</p>
        </div>
        <div>
          <p style={{ fontSize: '18px', color: 'gray' }}>Arrival Date</p>
          <p style={{ fontSize: '16px', color: 'black',fontWeight:'bold' }}>{flight.arival_date}</p>
        </div>
      </div>
      <Card style={{ border: 'none', marginBottom: '10px' }}>
        <Card.Body style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#003580' }}>{flight.departure_time.slice(0,5)}</h2>
            <p style={{ fontSize: '16px', color: 'gray' }}>{(airports.find(airport=>airport.city.toLowerCase()===flight.source_airport.toLowerCase())).uniqueCode}</p>
          </div>
          <div style={{ fontSize: '16px', color: 'black', fontWeight:'bold',textAlign:'center'}}>
            <p>Direct</p>
            <hr style={{ border: '2px dashed #ccc' }} />
            <p>{calculateFlightDuration(flight.departure_time, flight.arrival_time)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#003580' }}>{flight.arrival_time.slice(0,5)}</h2>
            <p style={{ fontSize: '16px', color: 'gray' }}>{(airports.find(airport=>airport.city.toLowerCase()===flight.destination_airport.toLowerCase())).uniqueCode}</p>
          </div>
        </Card.Body>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '20px', fontWeight:'bold',color:'#003580' }}>Baggage Details</p>
          <p style={{ fontSize: '14px', fontWeight:'bold', color: 'black' }}>Cabin: 7 Kg  </p>
          <p style={{ fontSize: '14px', fontWeight:'bold',color: 'black' }}> Check-in: {formData.travelClass=='ECONOMY'?flight.economy_baggage_allowance:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_economy_baggage_allowance:flight.business_baggage_allowance} Kg</p>
        
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;