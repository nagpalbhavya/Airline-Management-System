import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedButton } from '../redux/dashboardSlice';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Buttons = () => {
  const dispatch = useDispatch();
  const selectedButton = useSelector(state => state.dashboard.selectedButton);

  const handleClick = (buttonName) => {
    dispatch(setSelectedButton(buttonName));
  };

  const isButtonBlue = (buttonName) => selectedButton === buttonName;

  return (
    <div className="buttons">
      <Link to="/view-flights">
        <button
          className={isButtonBlue('viewFlights') ? 'blue-button' : 'gray-button'}
          onClick={() => handleClick('viewFlights')}
        >
          View Flights
        </button>
      </Link>
      <Link to="/add-flight">
        <button
          className={isButtonBlue('addFlights') ? 'blue-button' : 'gray-button'}
          onClick={() => handleClick('addFlights')}
        >
          Add Flights
        </button>
      </Link>
      <Link to="/remove-flights">
        <button
          className={isButtonBlue('removeFlights') ? 'blue-button' : 'gray-button'}
          onClick={() => handleClick('removeFlights')}
        >
          Remove Flights
        </button>
      </Link>
      <Link to="/update-flight-status">
        <button
          className={isButtonBlue('updateStatus') ? 'blue-button' : 'gray-button'}
          onClick={() => handleClick('updateStatus')}
        >
          Update Flight Status
        </button>
      </Link>
    </div>
  );
};

export default Buttons;
