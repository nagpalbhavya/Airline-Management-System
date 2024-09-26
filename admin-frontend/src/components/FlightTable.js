import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlights } from '../redux/FlightSlice'; // Import the fetchFlights action

const FlightTable = () => {
  const dispatch = useDispatch();
  const { flights, status, error } = useSelector((state) => state.flights);

  // Dispatch the fetchFlights action when the component mounts
  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  // Render loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Render error state
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flight-table">
      <h2>Flight Details</h2>
      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight_id}>
              <td>{flight.flight_id}</td>
              <td>{flight.source_airport}</td>
              <td>{flight.destination_airport}</td>
              <td>{flight.departure_time}</td>
              <td>{flight.arrival_time}</td>
              <td>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
