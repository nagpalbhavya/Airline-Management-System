import React, { useState, useEffect } from 'react'
import '../../css/Landing Page/SearchBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirports } from '../../redux/AirportSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { searchFlights } from '../../redux/FlightSlice';
import { setForm } from '../../redux/FormDataSlice';
const SearchBar = () => {
  const today=new Date();
  const monthNames = ["January", "February", "March", "April", 
    "May", "June","July", "August", "September", 
    "October", "November", "December"
];
const weekdayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"
];

  const date=today.getDate();
  const month=today.getMonth();
  const year=today.getFullYear();
  const day=today.getDay();
  const hour=today.getHours();

  const minDate=new Date().toISOString().split('T')[0];
  const navigate=useNavigate();

  let greeting=''
  if(hour<12)
    greeting='Good Morning'
  else if(hour<18)
    greeting='Good Afternoon'
  else
  greeting='Good Evening'

  const userFromCookie = Cookies.get('user');
  const user = userFromCookie ? JSON.parse(userFromCookie) : null;

  const dispatch=useDispatch();
  const airports=useSelector((state)=>state.airport.airports)
  console.log(airports)
  //const airports=['Bangalore','Delhi','Mumbai','Chennai']


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

  const [formData, setFormData]=useState({
    source:'',
    destination:'',
    date:'',
    numPassengers:0,
    travelClass:'ECONOMY',
  })

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
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
      setFormData({...formData, source})
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
      setFormData({...formData, destination})
      newError['destination']=null
      setFormError((prevErrors)=>({...prevErrors, ...newError}))
    }
  }

  useEffect(()=>{
    setFormData({...formData, numPassengers:travellers})
  },[travellers])



  const handleSearch=(e)=>{
    e.preventDefault();
    setError('')
    if(!formData.source||!formData.destination||!formData.date)
      setError('All fields are required.')
    else if(formData.source==formData.destination)
      setError('Source and destination cannot be the same')
    
    if(error==''&&formError['source']==null&&formError['destination']==null)
    {
      console.log(formData)
      dispatch(setForm(formData))
      dispatch(searchFlights(formData)).then(()=>{
        navigate("/flights", {state:{formData}})
      })
    }
  }

  return (
    <div className='searchbar-main'>
      <div className='searchbar-cont'>
        <p className='tagline'>{user==null?"Planning to travel? We've got youcovered with flights at the best price.":
        `${greeting}, ${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}`}
        </p>
        <div className='date-details'>
          <p>{monthNames[month]} {date}, {year}</p>
          <p>{weekdayNames[day]}</p>
        </div>
        <div className='add-search-details-bar'>
            <h4 className='searchbar-heading'>Search for flights</h4>
            <form onSubmit={handleSearch}>
              <div>
                <div className='from-to-depart-return'>
                <div className='from-and-to'>
                  <div className='search-input'>
                  <label for='form'>From</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='source' value={source} onChange={handleSourceChange} onFocus={()=>{setFromFocussed(true)}} onBlur={handleSourceBlur}></input>
                      {fromFocussed && source &&(
                        <div style={{marginTop:'1rem', marginLeft:'-15px', position:'absolute', height:'200px', overFlowY:'scroll', backgroundColor:'white', width:'280px', padding:'1rem', border:'1px solid black'}}>
                          {filteredAirports.length>0?(
                            filteredAirports.map(airport=><div key={airport.city}>{airport.city}</div>)):
                            (<div>{error}</div>)}
                            </div>
                          )}
                  </div>
                  <div className='search-input'>
                  <label for='form'>To</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='destination' value={destination} onChange={handleDestinationChange} onFocus={()=>{setToFocussed(true)}} onBlur={handleDestinationeBlur}></input>
                      {toFocussed && destination &&(
                        <div style={{marginTop:'1rem', marginLeft:'-15px', position:'absolute', height:'200px', overFlowY:'scroll', backgroundColor:'white', width:'280px', padding:'1rem', border:'1px solid black'}}>
                          {filteredAirports.length>0?(
                            filteredAirports.map(airport=><div key={airport.city}>{airport.city}</div>)):
                            (<div>{error}</div>)}
                            </div>
                          )}
                  </div>
                  </div>
                  <div className='depart-and-return'>
                    <div style={{display:'flex', flexDirection:'column'}} className='search-input'>
                    <label for='depart'>Depart</label>
                    <input type='date' name="date" className='datepicker' value={formData.date} onChange={handleChange} min={minDate}></input>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}} className='search-input'>
                    <label for="arrive">Arrive</label>
                    <input type='date' name='to' className='datepicker' min={minDate}></input>
                    </div>
                </div>
              </div>
              <div className='travellers-and-class'>
                <div className='input-container search-input'>
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
                  <div className='search-input travel-class'>
                  <label for='travelClass'>Travel Class</label>
                  <select class="form-select" name='travelClass' aria-label="choose travel class" value={formData.travelClass} onChange={handleChange}>
                  <option selected value="ECONOMY">ECONOMY</option>
                  <option value="PREMIUM ECONOMY">PREMIUM ECONOMY</option>
                  <option value="BUSINESS">BUSINESS</option>
                </select>
                  </div>
                </div>
              </div>
              <div style={{marginTop:'20px'}}>
                {formError.source!=null&&<p style={{color:'red'}}>{formError.source}</p>}
                {formError.destination!=null&&<p style={{color:'red', marginTop:'-10px'}}>{formError.destination}</p>}
                {error&&<p style={{color:'red'}}>{error}</p>}
              </div>
              <button className='search-button'>Search</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar