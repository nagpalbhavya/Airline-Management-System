import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from './flight-detail-component/Header'
import FlightDetails from './flight-detail-component/FlightDetails'
import PassengerDetails from './flight-detail-component/PassengerDetails'
import FareSummary from './flight-detail-component/FareSummary'
import CheckoutButton from './flight-detail-component/CheckoutButton'
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../css/flight-detail.css';
import Navbar from './Landing Page/Navbar';
import { setFlightId } from '../redux/BookingSlice';

function FlightDetail() {

    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {flightId}=useParams();
    dispatch(setFlightId(flightId))
    const flights=useSelector((state)=>state.flights.flights)
    console.log(flights)

    const formData=useSelector((state)=>state.form.formData)
    console.log(formData)

    const userFromCookie = Cookies.get('user');
    const user = userFromCookie ? JSON.parse(userFromCookie) : null;

    useEffect(() => {
        const user = Cookies.get('user'); // Check if the user is logged in
        if (!user) {
          // If not logged in, redirect to login page
          navigate('/login', { state: { from: `/flights/${flightId}` } });
        }
      }, [navigate]);

    const handlePassengerChange=(index,updatedPassenger)=>{
        const updatedPassengers=[...passengers]
        updatedPassengers[index]={...updatedPassengers[index],...updatedPassenger}
        setPassengers(updatedPassengers);

        console.log(passengers)
}

    const flight=flights.find(f=>f.flight_id==flightId)
    console.log(flights)
    console.log(formData.numPassengers)
    const baggageAllowance=formData.travelClass=='ECONOMY'?flight.economy_baggage_allowance:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_economy_baggage_allowance:flight.business_baggage_allowance
    const cost=formData.travelClass=='ECONOMY'?flight.economy_ticket_cost:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_ticket_economy_cost:flight.business_ticket_cost

    const [passengers, setPassengers]=useState(
        Array.from({length:formData.numPassengers}, () => ({
            name:'',
            email:'',
            travelClass:formData.travelClass,
            baggageAllowance:baggageAllowance
        }))
    )
    console.log(passengers)

  return (
    <div className="detail-main-container">
        <Navbar isLoggedIn={user==null?false:true}/>
      <div className="detail-content">
        <div className="detail-left-column">
          <FlightDetails data={{flight, formData}}/>
          {passengers.map((passenger, index)=>(
            <div  className="my-div">
            <PassengerDetails 
            index={index}
            passenger={passenger}
            onPassengerChange={handlePassengerChange}
            />
            </div>
          ))}
        </div>
        <div className="detail-right-column">
          <FareSummary data={{numPassengers:formData.numPassengers,cost}}/>
          <CheckoutButton passengerData={passengers}/>
        </div>
      </div>
    </div>
  );
}

export default FlightDetail;