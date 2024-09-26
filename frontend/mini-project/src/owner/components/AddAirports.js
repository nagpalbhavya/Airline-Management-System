
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAirport, deleteAirport, fetchAirports } from '../redux/features/ownerSlice'; // Ensure this is connected to your backend
import '../App.css';

//import '../css/components.css'

const AddAirports = () => {
  const [uniqueCode, setUniqueCode] = useState('');
  const [airportName, setAirportName] = useState('');
  const [city, setCity] = useState('');

  // Fetch airports from the Redux store (state)
  const airports = useSelector((state) => state.owner.airports); 
  const dispatch = useDispatch();

  // Fetch the list of airports when the component is mounted
  useEffect(() => {
    dispatch(fetchAirports()); // Fetches airports from the backend when the component loads
  }, [dispatch]);

  // Handle form submission to add a new airport
  const handleAddAirport = (e) => {
    e.preventDefault();
    const airportData = {
      uniqueCode,
      airportName,
      city,
    };
    dispatch(addAirport(airportData)); // Dispatch the addAirport action to add a new airport
    resetForm();
  };

  // Reset the form fields after submitting
  const resetForm = () => {
    setUniqueCode('');
    setAirportName('');
    setCity('');
  };

  // Handle disabling/deleting an airport
  const handleDeleteAirport = (uniqueCode) => {
    dispatch(deleteAirport(uniqueCode)); // Dispatch the deleteAirport action to remove the airport
  };

  return (
    <div className='container' >
      <h2>Add a New Airport</h2>
      <form onSubmit={handleAddAirport}>
        <input
          type="text"
          placeholder="Unique Code"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Airport Name"
          value={airportName}
          onChange={(e) => setAirportName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Add Airport</button>
      </form>

      <h2>List of Airports</h2>
      <ul>
        {airports.length > 0 ? (
          airports.map((airport) => (
            <li key={airport.uniqueCode}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                <span>
                  {airport.airportName} ({airport.city}) - {airport.uniqueCode}
                </span>
                <button onClick={() => handleDeleteAirport(airport.uniqueCode)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No airports available.</p>
        )}
      </ul>
    </div>
  );
};

export default AddAirports;
