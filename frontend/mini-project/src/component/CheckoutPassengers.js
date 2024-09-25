import React, { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import '../css/Checkout.css'; // Custom styles for this page
import FlightDetails from './flight-detail-component/FlightDetails';

const CheckoutPassengers = (props) => {
    const [open, setOpen] = useState(false); 
    const passenger=props.data
  return (
    <Card className="passenger-details-card mb-4" style={{ borderRadius: '20px',backgroundColor: '#70A6FF', color: 'white' }}>
                            <Card.Body>
                                <Button
                                    variant="link"
                                    onClick={() => setOpen(!open)}
                                    aria-controls="passenger-collapse-text"
                                    aria-expanded={open}
                                    className="d-flex justify-content-between align-items-center w-100"
                                >
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', textDecoration: 'underline' }}>{passenger.name}</span>
                                    <span style={{ color: 'white' }} >{open ? '▲' : '▼'}</span>
                                </Button>

                                <Collapse in={open}>
                                    <div id="passenger-collapse-text" style={{ color: 'white', fontSize:'18px', marginTop:'10px', marginLeft:'15px'}} >
                                        <p>Name: {passenger.name}</p>
                                        <p>Email: {passenger.email}</p>
                                        <p>Travel Class: {passenger.travelClass}</p>
                                        <p>Baggage Allowance: {passenger.baggageAllowance}</p>
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
  )
}

export default CheckoutPassengers