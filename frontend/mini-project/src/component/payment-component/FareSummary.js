import React from 'react';
import '../../css/payment.css';

const FareSummary = () => {
  return (
    <div className="fare-summary">
      <h3>Fare Summary</h3>
      <div className="fare-item">
        <span>Base Fare</span>
        <span>₹ 8,082</span>
      </div>
      <div className="fare-item">
        <span>Airline Tax</span>
        <span>₹ 650</span>
      </div>
      <div className="fare-item">
        <span>Platform Convenience fee</span>
        <span>₹ 125</span>
      </div>
      <div className="fare-item">
        <span>Discounts</span>
        <span>Applicable on the Checkout</span>
      </div>
      <div className="total-amount">
        <span>Total Amount</span>
        <span>₹ 8,857</span>
      </div>
    </div>
  );
};

export default FareSummary;
