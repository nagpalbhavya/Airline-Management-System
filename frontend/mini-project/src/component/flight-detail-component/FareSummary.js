import React from 'react';
import '../../css/flight-detail.css';

const FareSummary = (props) => {

  const numPassengers=props.data.numPassengers
  const cost=props.data.cost
  const totalCost=cost*numPassengers
  const airlineTax=650
  const platformFee=125
  const total=totalCost+airlineTax+platformFee

  return (
    <div className="detail-fare-summary">
      <h3>Fare Summary</h3>
      <div className="detail-fare-item">
        <span>Base Fare</span>
        <span>₹ {(totalCost).toLocaleString()}</span>
      </div>
      <div className="detail-fare-item">
        <span>Airline Tax</span>
        <span>₹ {(airlineTax).toLocaleString()}</span>
      </div>
      <div className="detail-fare-item">
        <span>Platform Convenience fee</span>
        <span>₹ {(platformFee).toLocaleString()}</span>
      </div>
      <div className="detail-fare-item">
        <span>Discounts</span>
        <span>Applicable on the Checkout</span>
      </div>
      <div className="detail-total-amount">
        <span>Total Amount</span>
        <span>{(total).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default FareSummary;
