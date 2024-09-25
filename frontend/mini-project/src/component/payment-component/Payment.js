// src/components/Payment.js
import React, { useState } from 'react';
import '../../css/payment.css';
 // Assuming you will create this file for styles

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleVerifyUpi = () => {
    // Simple verification logic for UPI ID
    if (upiId.includes('@')) {
      setVerificationMessage('Verified!');
    } else {
      setVerificationMessage('Invalid UPI ID');
    }
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    // Handle credit/debit card submission logic here
    alert('Card details submitted!');
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-option">
        <input
          type="radio"
          id="upi"
          name="paymentMethod"
          value="upi"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="upi">UPI</label>
      </div>
      {paymentMethod === 'upi' && (
        <>
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button onClick={handleVerifyUpi}>Verify</button>
          {verificationMessage && <p>{verificationMessage}</p>}
        </>
      )}
      <div className="payment-option">
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="card">Credit/Debit Card</label>
      </div>
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmitCard}>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name on Card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
