import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFlights , deleteFlight } from '../redux/FlightSlice'; // Update the import path as needed

const RemoveFlightTable = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.flights);

  // Fetch flights on component mount
  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleDelete = (flight_id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      dispatch(deleteFlight(flight_id)); // Dispatch delete action for the flight
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flight-table">
      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map(flight => (
              <tr key={flight.flight_id}>
                <td>{flight.flight_id}</td>
                <td>{flight.airlineName}</td>
                <td>{flight.source_airport}</td>
                <td>{flight.destination_airport}</td>
                <td>{flight.departure_time}</td>
                <td>{flight.arrival_time}</td>
                <td>
                  <button onClick={() => handleDelete(flight.flight_id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No flights available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RemoveFlightTable;
