import React, { useState, useEffect } from 'react'
import '../css/flightsResultsPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirports } from '../redux/AirportSlice';

const FlightsResultsPage = () => {

    const dispatch=useDispatch();
  //const airports=useSelector((state)=>state.airport.airports)
  const airports=['Bangalore','Delhi','Mumbai','Chennai']
  console.log(airports)


  const [travellers, setTravellers]=useState(1);
  const [source, setSource]=useState('Bangalore')
  const [destination, setDestination]=useState('Delhi')
  const [travelDate, setTravelDate]=useState('2024-09-25');
  const [travelClass, setTravelClass]=useState('1');
  const [error, setError]=useState('')
  const [filteredAirports, setFilteredAirports]=useState([])
  const [isFocussed, setIsFocussed]=useState(false)

  const handleFocus=()=>{
    setIsFocussed(true);
  }

  const handleBlur=()=>{
    setIsFocussed(false);
  }

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
    source:'Bangalore',
    destination:'Delhi',
    date:'2024-09-25',
    numPassengers:1,
    travelClass:'ECOMOMY',
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
    //   airport.name.toLowerCase().includes(input.toLowerCase())||
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
    //   airport.name.toLowerCase().includes(input.toLowerCase())||
    //   airport.uniqueCode.toLowerCase().includes(input.toLowerCase())
    // })

    // setFilteredAirports(airports)
  }

  const filterAirports=(value, type)=>{
    setError('');
    const filtered=airports.filter(airport=>
      (airport.toLowerCase().includes(value.toLowerCase())&&
      (type==='source'?airport!==destination:airport!==source))
    ).slice(0,3);

    if(filtered.length===0&&value.length>0)
      setError('Airport not found')

    setFilteredAirports(filtered)
  }


  const handleInput=(type)=>{
    if(type==='source'&&source===destination)
    {
      setError('Source and destination cannot be the same')
    }
    else if(type==='destination'&&source===destination)
    {
      setError('Source and destination cannot be the same')
    }
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    setError('')
    setFormData({...formData, source, destination, numPassengers:travellers})
    console.log(formData)
    if(!formData.source||!formData.destination||!formData.date)
      setError('All fields are required.')
  }
  return (
    <div className='results-main-main'>
        <form onSubmit={handleSearch}>
              <div className='results-main'>
                <div className='results-from-to-depart-return'>
                <div className='results-from-and-to'>
                  <div className='results-search-input'>
                  <label for='form'>From</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='source' value={source} onChange={handleSourceChange} onFocus={handleFocus} onBlur={handleBlur}></input>
                      {isFocussed && source &&(
                        <div style={{marginTop:'1rem', display:'absolute'}}>
                          {filteredAirports.length>0 && !error?(
                            filteredAirports.map(airport=><div key={airport}>{airport}</div>)):
                            (<div>{error}</div>)}
                            </div>
                          )}
                  </div>
                  <div className='results-search-input'>
                  <label for='form'>To</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='destination' value={destination} onChange={handleDestinationChange} onFocus={handleFocus} onBlur={handleBlur}></input>
                      {isFocussed && destination &&(
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
                    <input type='date' name="date" className='datepicker' value={formData.date} onChange={handleChange}></input>
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
            </form>

            <div className='flight-main'> 
                <div className='flight-div'>
                  <div className='flight-logo-and-name'>
                    <img src="indigo-logo.png" className='airline-logo'/>
                    <h2>Indigo</h2>
                  </div>
                  <div className='flight-details'>
                    <div className='source-details'>
                        <h2>10:15</h2>
                        <h6>BRL</h6>
                    </div>
                    <div className='horizontal-line'>
                        <p className='hlb'>Direct</p>
                        <p className='hlb'>-----------------------------------------------</p>
                        <p className='hls'>-----------------</p>
                        <p className='hlb'>Duration</p>
                    </div>
                    <div className='destination-details'>
                        <h2>12:45</h2>
                        <h6>DEL</h6>
                    </div>
                  </div>
                  <div className='cost-details'>
                        <h3>$ 8083</h3>
                        <button className='book-button'>Book Now</button>
                  </div>
                </div>
                <div className='big-screen-cost-details'>
                <h3>$ 8083</h3>
                <button className='big-book-button'>Book Now</button>
                </div>
            </div>
    </div>
  )
}

export default FlightsResultsPage