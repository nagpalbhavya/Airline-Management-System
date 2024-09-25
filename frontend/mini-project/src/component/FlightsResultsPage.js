import React, { useState, useEffect } from 'react'
import '../css/flightsResultsPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchAirports } from '../redux/AirportSlice';
import { searchFlights } from '../redux/FlightSlice';
import Navbar from './Landing Page/Navbar';
import Cookies from 'js-cookie';


const FlightsResultsPage = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
     const airports=useSelector((state)=>state.airport.airports)
     const flights=useSelector((state)=>state.flights.flights)
     const formData=useSelector((state)=>state.form.formData)
     console.log(formData)
    
    const userFromCookie = Cookies.get('user');
    const user = userFromCookie ? JSON.parse(userFromCookie) : null;

    const [travellers, setTravellers]=useState(1);
  const [source, setSource]=useState('')
  const [destination, setDestination]=useState('')
  const [travelDate, setTravelDate]=useState('');
  const [travelClass, setTravelClass]=useState('');
  const [error, setError]=useState('')
  const [formError, setFormError]=useState({})
  const [filteredAirports, setFilteredAirports]=useState([])
  const [toFocussed, setToFocussed]=useState(false)
  const [fromFocussed, setFromFocussed]=useState(false)
    

    useEffect(()=>{
        dispatch(fetchAirports())
        },[dispatch])
    
      const increment=()=>{
        setTravellers(prevValue=>prevValue>5?prevValue:prevValue+1);
      }
    
      const decrement=()=>{
        setTravellers(prevValue=>prevValue>1?prevValue-1:prevValue);
      }
    
      const [formDataa, setFormDataa]=useState(formData)
    
      const handleChange=(e)=>{
        setFormDataa({...formData,[e.target.name]:e.target.value})
      }
    
      const handleSourceChange=(e)=>{
        const input=e.target.value;
        setSource(input)
    
        filterAirports(input,'source')
        //setFormData({...formData, source:input})
    
        // const matches=airports.filter(airport=>{
        //   airport.city.toLowerCase().includes(input.toLowerCase())||
        //   airport.uniqueCode.toLowerCase().includes(input.toLowerCase())
       // })
    
        //setFilteredAirports(airports)
      }
    
      const handleDestinationChange=(e)=>{
        const input=e.target.value;
        setDestination(input)
        filterAirports(input,'destination')
        //setFormData({...formData, destination:input})
    
        // const matches=airports.filter(airport=>{
        //   airport.city.toLowerCase().includes(input.toLowerCase())||
        //   airport.uniqueCode.toLowerCase().includes(input.toLowerCase())
        // })
    
        //setFilteredAirports(airports)
      }
    
      const filterAirports=(value, type)=>{
        setError('');
        const filtered=airports.filter(airport=>
          (airport.city.toLowerCase().includes(value.toLowerCase())&&
          (type==='source'?airport.city!==destination:airport.city!==source))
        ).slice(0,3)
    
        if(filtered.length===0&&value.length>0)
          setError('Airport not found')
    
        setFilteredAirports(filtered)
      }
    
      const handleSourceBlur=()=>{
        let newError={}
        setFromFocussed(false)
        const res=airports.find(airport=>airport.city.toLowerCase()===source.toLowerCase())
        if(res==null)
        {
          newError['source']='Source not found'
          setFormError((prevErrors)=>({...prevErrors, ...newError}))
        }
        else
        {
          setSource(res.city)
          newError['source']=null
          setFormError((prevErrors)=>({...prevErrors, ...newError}))
        }
      }
    
      const handleDestinationeBlur=()=>{
        let newError={}
        setToFocussed(false)
        const res=airports.find(airport=>airport.city.toLowerCase()===destination.toLowerCase())
        if(res==null)
        {
          newError['destination']='Destination not found'
          setFormError((prevErrors)=>({...prevErrors, ...newError}))
        }
        else
        {
          setDestination(res.city)
          newError['destination']=null
          setFormError((prevErrors)=>({...prevErrors, ...newError}))
        }
      }
    
    
    
      const handleSearch=(e)=>{
        e.preventDefault();
        setError('')
        setFormDataa({...formData, source, destination, numPassengers:travellers})
        if(!formData.source||!formData.destination||!formData.date)
          setError('All fields are required.')
        else if(formData.source==formData.destination)
          setError('Source and destination cannot be the same')
        
        if(error==''&&formError['source']==null&&formError['destination']==null)
        {
          console.log(formData)
          dispatch(searchFlights(formDataa)).then(()=>{
            navigate("/flights", {state:{formDataa}})
          })
        }
      }

      const calculateFlightDuration=(departure,arrival)=>{
        const [depHours, depMinutes]=departure.split(':').map(Number);
        const [arrHours, arrMinutes]=arrival.split(':').map(Number);

        const departureTime=new Date();
        departureTime.setHours(depHours, depMinutes,0)

        const arrivalTime=new Date();
        arrivalTime.setHours(arrHours,arrMinutes,0)

        if(arrivalTime<departureTime)
        {
            arrivalTime.setDate(arrivalTime.getDate()+1);
        }

        const durationInMinutes=(arrivalTime-departureTime)/60000;

        console.log(durationInMinutes)

        const hours=Math.floor(durationInMinutes/60);
        const minutes=durationInMinutes%60;

        return `${hours} ${hours>1?'hours':'hour'} ${minutes} ${minutes>1?'minutes':'minute'}`
      }

      const handleBookNow=(id)=>{
        navigate(`/flights/${id}`, {state:{id}})
      }
  return (
    <div style={{backgroundColor:'#FEFFDD'}}>
    <Navbar isLoggedIn={user==null?false:true}/>
    <div className='results-main-main'>
        {/* <form onSubmit={handleSearch}>
              <div className='results-main'>
                <div className='results-from-to-depart-return'>
                <div className='results-from-and-to'>
                  <div className='results-search-input'>
                  <label for='form'>From</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='source' value={source} onChange={handleSourceChange} onFocus={()=>{setFromFocussed(true)}} onBlur={handleSourceBlur}></input>
                      {fromFocussed && source &&(
                        <div style={{marginTop:'1rem', display:'absolute'}}>
                          {filteredAirports.length>0 && !error?(
                            filteredAirports.map(airport=><div key={airport}>{airport}</div>)):
                            (<div>{error}</div>)}
                            </div>
                          )}
                  </div>
                  <div className='results-search-input'>
                  <label for='form'>To</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='destination' value={destination} onChange={handleDestinationChange} onFocus={()=>{setToFocussed(true)}} onBlur={handleDestinationeBlur}></input>
                      {toFocussed && destination &&(
                        <div>
                          {filteredAirports.length>0 && !error?(
                            filteredAirports.map(airport=><div key={airport}>{airport}</div>)):
                            (<div>{error}</div>)}
                            </div>
                          )}
                  </div>
                  </div>
                  <div className='results-depart-and-return'>
                    <div style={{display:'flex', flexDirection:'column'}} className='results-search-input'>
                    <label for='depart'>Depart</label>
                    <input type='date' name="date" className='datepicker' value={formDataa.date} onChange={handleChange}></input>
                    </div>
                </div>
              </div>
              <div className='results-travellers-and-class'>
                <div className='input-container results-search-input'>
                <label for="travellers" style={{marginRight:'1rem'}}>Travellers</label>
                <button type='button' className="button" onClick={decrement}>-</button>
                <input
                    type="number"
                    value={travellers}
                    readOnly
                    className="input-field"
                    name='travellers'
                  />
                  <button type='button' className="button" onClick={increment}>+</button>
                  </div>
                  <div className='results-search-input travel-class'>
                  <label for='travelClass'>Travel Class</label>
                  <select class="form-select" name='travelClass' aria-label="choose travel class" value={formData.travelClass} onChange={handleChange}>
                  <option selected value="ECONOMY">ECOMOMY</option>
                  <option value="PREMIUM ECONOMY">PREMIUM ECONOMY</option>
                  <option value="BUSINESS">BUSINESS</option>
                </select>
                  </div>
                </div>
                <button className='results-search-button'>Search</button>
              </div>
            </form> */}
            {flights!=[]?(flights?.map(flight=>(
                <div className='flight-main'>
                <div className='flight-div'>
                  <div className='flight-logo-and-name'>
                    <img src={flight.airlineName} className='airline-logo'/>
                    <h2>{flight.airlineImage}</h2>
                  </div>
                  <div className='flight-details'>
                    <div className='source-details'>
                        <h2>{flight.departure_time.slice(0,5)}</h2>
                        <h6>{(airports.find(airport=>airport.city.toLowerCase()===flight.source_airport.toLowerCase())).uniqueCode}</h6>
                    </div>
                    <div className='horizontal-line'>
                        <p className='hlb'>Direct</p>
                        <p className='hlb'>-----------------------------------------------</p>
                        <p className='hls'>-----------------</p>
                        <p className='hlb'>{calculateFlightDuration(flight.departure_time, flight.arrival_time)}</p>
                    </div>
                    <div className='destination-details'>
                        <h2>{flight.arrival_time.slice(0,5)}</h2>
                        <h6>{(airports.find(airport=>airport.city.toLowerCase()===flight.destination_airport.toLowerCase())).uniqueCode}</h6>
                    </div>
                  </div>
                  <div className='cost-details'>
                        <h3>₹ {(formData.travelClass=='ECONOMY'?flight.economy_ticket_cost:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_ticket_economy_cost:flight.business_ticket_cost).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
                        <button className='book-button' onClick={()=>{handleBookNow(flight.flight_id)}}>Book Now</button>
                  </div>
                </div>
                <div className='big-screen-cost-details'>
                <h3>₹ {(formData.travelClass=='ECONOMY'?flight.economy_ticket_cost:formData.travelClass=='PREMIUM ECONOMY'?flight.premium_ticket_economy_cost:flight.business_ticket_cost).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
                <button className='big-book-button' onClick={()=>{handleBookNow(flight.flight_id)}}>Book Now</button>
                </div>
            </div>
            ))):<div>There are no flights that match your search.</div>}
            
    </div>
    </div>
  )
}

export default FlightsResultsPage