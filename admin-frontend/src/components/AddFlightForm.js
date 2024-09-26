import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewFlight } from '../redux/dashboardSlice';

const AddFlightForm = () => {
  const [formData, setFormData] = useState({
    airline_unique_code: '',
    source_airport: '',
    destination_airport: '',
    departure_time: '',
    arrival_time: '',
    departure_date: '',
    arival_date: '',
    economy_seats: '',
    premium_economy_seats: '',
    business_seats: '',
    economy_baggage_allowance: '',
    premium_economy_baggage_allowance: '',
    business_baggage_allowance: '',
    economy_ticket_cost: '',
    premium_ticket_economy_cost: '',
    business_ticket_cost: '',
    isflight_disabled:false,
    airlineImage:'',
    airlineName:''
  });

  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here.
    console.log('Flight Data:', formData);
    dispatch(addNewFlight(formData))
  };

  return (
    <form className="add-flight-form" onSubmit={handleSubmit}>
      <h2>Add New Flight</h2>

      <label>Airplane Unique Code</label>
      <input type="text" name="airline_unique_code" value={formData.airline_unique_code} onChange={handleChange} />

      <label>Source Airport</label>
      <input type="text" name="source_airport" value={formData.source_airport} onChange={handleChange} />

      <label>Destination Airport</label>
      <input type="text" name="destination_airport" value={formData.destination_airport} onChange={handleChange} />

      <label>Departure Time</label>
      <input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} />

      <label>Arrival Time</label>
      <input type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} />

      <label>Departure Date</label>
      <input type="date" name="departure_date" value={formData.departure_date} onChange={handleChange} />

      <label>Arrival Date</label>
      <input type="date" name="arival_date" value={formData.arival_date} onChange={handleChange} />

      <h3>Seats</h3>
      <label>Economy Class</label>
      <input type="number" name="economy_seats" value={formData.economy_seats} onChange={handleChange} />

      <label>Premium Economy Class</label>
      <input type="number" name="premium_economy_seats" value={formData.premium_economy_seats} onChange={handleChange} />

      <label>Business Class</label>
      <input type="number" name="business_seats" value={formData.business_seats} onChange={handleChange} />

      <h3>Baggage Allowance</h3>
      <label>Economy Class</label>
      <input type="number" name="economy_baggage_allowance" value={formData.economy_baggage_allowance} onChange={handleChange} />

      <label>Premium Economy Class</label>
      <input type="number" name="premium_economy_baggage_allowance" value={formData.premium_economy_baggage_allowance} onChange={handleChange} />

      <label>Business Class</label>
      <input type="number" name="business_baggage_allowance" value={formData.business_baggage_allowance} onChange={handleChange} />

      <h3>Price</h3>
      <label>Economy Class</label>
      <input type="number" name="economy_ticket_cost" value={formData.economy_ticket_cost} onChange={handleChange} />

      <label>Premium Economy Class</label>
      <input type="number" name="premium_ticket_economy_cost" value={formData.premium_ticket_economy_cost} onChange={handleChange} />

      <label>Business Class</label>
      <input type="number" name="business_ticket_cost" value={formData.business_ticket_cost} onChange={handleChange} />

      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlightForm;
