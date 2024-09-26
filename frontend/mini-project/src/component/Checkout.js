import React, { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import '../css/Checkout.css'; // Custom styles for this page
import FlightDetails from './flight-detail-component/FlightDetails';
import CheckoutPassengers from './CheckoutPassengers';
import Navbar from './Landing Page/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyOffer, removeOffer } from '../redux/offerSlice';
import { createBooking } from '../redux/BookingSlice';
{/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link> */ }

const Checkout = () => {
    // const [open, setOpen] = useState(false); // State to toggle passenger details
    const flights=useSelector((state)=>state.flights.flights)
    const flightId=useSelector((state)=>state.booking.flightId)
    const flight=flights.find(f=>f.flight_id==flightId)
    const formData=useSelector((state)=>state.form.formData)
    const offerApplied=useSelector((state)=>state.offers.offerApplied)
    const cost=formData.travelClass=='ECONOMY'?flight.economy_ticket_cost:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_ticket_economy_cost:flight.business_ticket_cost
    const numPassengers=useSelector((state)=>state.booking.passengerData.length)
    const Passengers=useSelector((state)=>state.booking.passengerData)
    const baseFare=cost*numPassengers;
    const airlineTax=650
    const platformFee=125
    const discountsApplied='-'

    const offers=useSelector((state)=>state.offers.offers)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const total=baseFare+airlineTax+platformFee
    const totalAmount=total-(offerApplied!=null?(total*(offerApplied.discountPercentage/100)):0)

    const userFromCookie = Cookies.get('user');
    const user = userFromCookie ? JSON.parse(userFromCookie) : null;
    const userId=user.userId

    const applyO=(index)=>{
        dispatch(applyOffer(index))
    }

    const jsDate=new Date()
    function formatDateForJava(date) {
        const pad = (num) => String(num).padStart(2, '0');
        
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are zero-indexed
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
      }
      
      const formattedDate = formatDateForJava(jsDate);

    const removeO=()=>{
        dispatch(removeOffer())
    }

    const movetoPaymentPortal=()=>{
        const bookingObject={userId,flightId,bookingDate:formattedDate,totalCost:totalAmount,status:"PENDING"}
        dispatch(createBooking(bookingObject))
        navigate('/payment')
        
    }
    return (
        <>
        <Navbar isLoggedIn={user==null?false:true}/>
        <div className="checkout-container container">
            <br />
            <h2 className="checkout-heading">Checkout</h2>
            <p className="checkout-description">Please ensure all details are correct.</p>

            <div className="row checkout-main">
                {/* Left Section: Flight Details, Passenger Details, Offers & Discounts */}
                <div className="col-md-7">
                    {/* Flight Details Section */}
                    <div className="flight-details-section">
                        <h3 className="section-title">Flight Details</h3>
                        <FlightDetails data={{flight, formData}}/>
                        {/* <Card className="flight-details-card mb-4" style={{ borderRadius: '40px'}}>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div className="flight-info">
                                    <div className="airline-info">
                                        <h5 className="airline-name">IndiGo</h5>
                                        
                                    </div>
                                    <div className="time-info">
                                        <h5 className="flight-time">10:15</h5>
                                        <p>BRL</p>
                                    </div>
                                    <div className="duration">
                                        <p>Direct</p>
                                        <p>-------------------------------------</p>
                                        <p>Duration: 3h 30m</p>
                                    </div>
                                    <div className="time-info">
                                        <h5 className="flight-time">12:45</h5>
                                        <p>DEL</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card> */}
                    </div>

                    {/* Passenger Details Section */}
                    <div className="passenger-details-section">
                        <h3 className="section-title" style={{marginTop:'50px', marginBottom:'25px'}}>Passenger Details</h3>
                        {Passengers.map(passenger=>(
                        // <Card className="passenger-details-card mb-4" style={{ borderRadius: '20px',backgroundColor: '#70A6FF', color: 'white' }}>
                        //     <Card.Body>
                        //         <Button
                        //             variant="link"
                        //             onClick={() => setOpen(!open)}
                        //             aria-controls="passenger-collapse-text"
                        //             aria-expanded={open}
                        //             className="d-flex justify-content-between align-items-center w-100"
                        //         >
                        //             <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', textDecoration: 'underline' }}>{passenger.name}</span>
                        //             <span style={{ color: 'white' }} >{open ? '▲' : '▼'}</span>
                        //         </Button>

                        //         <Collapse in={open}>
                        //             <div id="passenger-collapse-text" style={{ color: 'white', fontSize:'18px', marginTop:'10px', marginLeft:'15px'}} >
                        //                 <p>Name: {passenger.name}</p>
                        //                 <p>Email: {passenger.email}</p>
                        //                 <p>Travel Class: {passenger.travelClass}</p>
                        //                 <p>Baggage Allowance: {passenger.baggageAllowance}</p>
                        //             </div>
                        //         </Collapse>
                        //     </Card.Body>
                        // </Card>
                        <CheckoutPassengers data={passenger}/>
                    ))}
                    </div>

                    {/* Offers & Discounts Section */}
                    <div className="offers-details-section" style={{marginTop:'50px'}}>
                        <h3 className="section-title" style={{ fontSize: '20px', fontWeight: 'Bold', textAlign: 'left', marginBottom:'25px'}} >Offers and Discounts</h3>
                        <div style={{display:'flex', flexwrap:'wrap', rowGap:'20px', columnGap:'30px', width:'67vw'}}>
                        {offers.map((offer,index)=>(
                        <Card className="offers-discounts-card mb-4" style={{ backgroundColor: '#ffc721', padding: '5px', width: '250px', height: '150px' }}>
                            <Card.Body style={{display:'flex', flexDirection:'column'}}>
                                <div>
                                    <p className="offer-text">{offer.description}</p>
                                </div>
                                <Button variant="primary" style={{marginTop:'30px'}} onClick={()=>{applyO(index)}}>Apply</Button>
                            </Card.Body>
                        </Card>))}
                        </div>
                    </div>
                </div>

                {/* Right Section: Fare Summary */}
                <div className="col-md-5">
                    <Card className="fare-summary-card" style={{
                        backgroundColor: '#1a3365',
                        color: 'rgb(226, 218, 218)',
                        borderRadius: '17px',
                        padding: '20px', 
                        height:'500px',
                        marginTop:'30px'
                    }}>
                        <Card.Body>
                            <h4 className="fare-summary-title">Fare Summary</h4>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className="fare-item">Base Fare</p>
                                <p className="fare-price">₹ {baseFare.toLocaleString()}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fare-item">Airline Tax</p>
                                <p className="fare-price">₹ {airlineTax.toLocaleString()}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fare-item">Platform Convenience Fee</p>
                                <p className="fare-price">₹ {platformFee.toLocaleString()}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fare-item">Discounts</p>
                                <p className="fare-price">{offerApplied==null?'-':offerApplied.offerCode}</p>
                            </div>
                            {offerApplied!=null?<button style={{fontSize:'15px', textAlign:'center', padding:'5px 15px', backgroundColor:'red', color:'white'}} onClick={()=>{removeO()}}>remove</button>:''}
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="fare-total">Total Amount</h5>
                                <h5 className="fare-total">₹ {totalAmount}</h5>
                            </div>
                            <Button variant="warning" className="payment-button" onClick={movetoPaymentPortal}>
                                Proceed to Payment
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {/* <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script> */}
        </div>
        </>
    );
};

export default Checkout;
