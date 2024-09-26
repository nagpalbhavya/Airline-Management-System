
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights, updateFlightStatus } from '../redux/features/ownerSlice';
import { Table, Button } from 'react-bootstrap';

const ViewFlights = () => {
  const dispatch = useDispatch();
  const { flights, status, error } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(fetchFlights()); // Fetch flights when the component mounts
  }, [dispatch]);

  // Handle flight disable/enable button click
  const handleDisableClick = (flightId, currentStatus) => {
    const newStatus = !currentStatus; // Toggle current status
    dispatch(updateFlightStatus({ flightId, is_disabled_val: newStatus })); // Dispatch action with flight ID and new status
  };

  return (
    <div className='container'>
      <h2>All Flights</h2>
      {status === 'loading' && <p>Loading flights...</p>}
      {error && <p>{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Status</th>
            <th>Actions</th>
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
              <td>{flight.departure_date}</td>
              <td>{flight.arival_date}</td>
              <td>{flight.isflight_disabled ? 'Disabled' : 'Active'}</td>
              <td>
                <Button
                  variant={flight.isflight_disabled ? 'success' : 'danger'}
                  onClick={() => handleDisableClick(flight.flight_id, flight.isflight_disabled)}
                >
                  {flight.isflight_disabled ? 'Enable' : 'Disable'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewFlights;
