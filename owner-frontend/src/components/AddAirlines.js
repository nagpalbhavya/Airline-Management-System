import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAirline, fetchAirlines, deleteAirline } from '../redux/features/ownerSlice';
import '../App.css';

const AddAirlines = () => {
  const dispatch = useDispatch();
  const airlines = useSelector((state) => state.owner.airlines); // Get the list of airlines from Redux state
  const [airlineData, setAirlineData] = useState({
    airlineName: '',
    airlinePassword: '',
    airlineUniqueCode: '',
    airlineEmail: '', // Add email to the state
  });

  useEffect(() => {
    // Fetch the airlines when the component loads
    dispatch(fetchAirlines());
  }, [dispatch]);

  const handleChange = (e) => {
    setAirlineData({
      ...airlineData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the addAirline action with the form data
    dispatch(addAirline(airlineData));
    setAirlineData({
      airlineName: '',
      airlinePassword: '',
      airlineUniqueCode: '',
      airlineEmail: '', // Reset email field
    });
  };

  const handleDelete = (airlineId) => {
    // Dispatch the deleteAirline action with the airline's ID
    dispatch(deleteAirline(airlineId));
  };

  return (
    <div className='container'>
      <h2>Add Admins</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="airlineName"
          value={airlineData.airlineName}
          onChange={handleChange}
          placeholder="Airline Name"
          required
        />
        <input
          type="password"
          name="airlinePassword"
          value={airlineData.airlinePassword}
          onChange={handleChange}
          placeholder="Airline Password"
          required
        />
        <input
          type="text"
          name="airlineUniqueCode"
          value={airlineData.airlineUniqueCode}
          onChange={handleChange}
          placeholder="Airline Unique Code"
          required
        />
        <input
          type="email"
          name="airlineEmail"
          value={airlineData.airlineEmail}
          onChange={handleChange}
          placeholder="Airline Email"
          required
        />
        <button type="submit">Add Admin</button>
      </form>

      <h2>List of Admins</h2>
      <ul>
        {airlines.map((airline) => (
          <li key={airline.airlineId}>
            {airline.airlineName} ({airline.airlineUniqueCode}) - {airline.airlineEmail}
            <button onClick={() => handleDelete(airline.airlineId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddAirlines;
