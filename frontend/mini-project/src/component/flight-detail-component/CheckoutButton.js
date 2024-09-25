import React from 'react';
import '../../css/flight-detail.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPassenger } from '../../redux/BookingSlice';

const CheckoutButton = (props) => {

  const passengers=props.passengerData
  const passengerData=useSelector((state)=>state.booking.passengerData)
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const handleProceedtoCheckout=()=>{
    passengers.map(passenger=>{
      dispatch(addPassenger(passenger))
    })
    console.log(passengerData)
    navigate('/checkout')
}
  return (
    <div className="detail-checkout-button">
      <button onClick={handleProceedtoCheckout}>Continue to Checkout</button>
    </div>
  );
};

export default CheckoutButton;
