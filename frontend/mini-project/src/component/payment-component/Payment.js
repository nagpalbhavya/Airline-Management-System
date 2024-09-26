import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { addPassenger, createPayment } from '../../redux/BookingSlice';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const flights = useSelector((state) => state.flights.flights);
  const flightId = useSelector((state) => state.booking.flightId);
  const flight = flights.find(f => f.flight_id == flightId);
  const formData = useSelector((state) => state.form.formData);
  const bookingId = useSelector((state) => state.booking.bookingId);
  const offerApplied = useSelector((state) => state.offers.offerApplied);
  const cost = formData.travelClass === 'ECONOMY' ? flight.economy_ticket_cost :
               formData.travelClass === 'PREMIUM ECONOMY' ? flight.premium_ticket_economy_cost :
               flight.business_ticket_cost;
  const numPassengers = useSelector((state) => state.booking.passengerData.length);
  const Passengers = useSelector((state) => state.booking.passengerData);
  const baseFare = cost * numPassengers;
  const airlineTax = 650;
  const platformFee = 125;
  const discountsApplied = '-';

  const offers = useSelector((state) => state.offers.offers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = baseFare + airlineTax + platformFee;
  const totalAmount = total - (offerApplied != null ? (total * (offerApplied.discountPercentage / 100)) : 0);

  const userFromCookie = Cookies.get('user');
  const user = userFromCookie ? JSON.parse(userFromCookie) : null;
  const userId = user.userId;

  const handleVerifyUpi = () => {
    if (upiId.includes('@')) {
      setVerificationMessage('Verified!');
      const passengerData = { status: 'SUCCESSFUL', bookingId, amount: cost, passengers: Passengers };
      dispatch(createPayment(passengerData));
      navigate('/feedback');
    } else {
      setVerificationMessage('Invalid UPI ID');
    }
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    alert('Card details submitted!');
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  };

  const paymentOptionStyle = {
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const messageStyle = {
    textAlign: 'center',
    marginTop: '10px',
    color: verificationMessage === 'Verified!' ? 'green' : 'red',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select Payment Method</h2>
      <div style={paymentOptionStyle}>
        <input
          type="radio"
          id="upi"
          name="paymentMethod"
          value="upi"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="upi" style={{ marginLeft: '5px' }}>UPI</label>
      </div>
      {paymentMethod === 'upi' && (
        <>
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleVerifyUpi} style={buttonStyle}>Verify</button>
          {verificationMessage && <p style={messageStyle}>{verificationMessage}</p>}
        </>
      )}
      <div style={paymentOptionStyle}>
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="card" style={{ marginLeft: '5px' }}>Credit/Debit Card</label>
      </div>
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmitCard}>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Name on Card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Pay Now</button>
        </form>
      )}
    </div>
  );
}
