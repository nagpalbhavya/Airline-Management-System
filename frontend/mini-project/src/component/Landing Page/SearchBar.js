import React, { useState, useEffect } from 'react'
import '../../css/Landing Page/SearchBar.css'

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


  const [travellers, setTravellers]=useState(1);

  const increment=()=>{
    setTravellers(prevValue=>prevValue>5?prevValue:prevValue+1);
  }

  const decrement=()=>{
    setTravellers(prevValue=>prevValue>1?prevValue-1:prevValue);
  }

  const [flights,setFlights]=useState([]);
  const [airports, setAirports]=useState([]);
  const [formData, setFormData]=useState({
    source:'',
    destination:'',
    date:'',
    numPassengers:1,
    travelClass:'ECOMOMY',
  })

  const [error, setError]=useState('')
  const [filteredAirports, setFilteredAirports]=useState([])

  // useEffect(()=>{
  //   //fetch airports and flights, and store them in flights and airports
  // },[])

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSourceChange=(e)=>{
    const input=e.target.value;
    setFormData({...formData, source:input})

    const matches=airports.filter(airport=>{
      airport.name.toLowerCase().includes(input.toLowerCase())||
      airport.uniqueCode.toLowerCase().includes(input.toLowerCase())
    })

    setFilteredAirports(airports)
  }

  const handleDestinationChange=(e)=>{
    const input=e.target.value;
    setFormData({...formData, destination:input})

    const matches=airports.filter(airport=>{
      airport.name.toLowerCase().includes(input.toLowerCase())||
      airport.uniqueCode.toLowerCase().includes(input.toLowerCase())
    })

    setFilteredAirports(airports)
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    setError('')
    setFormData({...formData,numPassengers:travellers})
    if(!formData.source||!formData.destination||!formData.date)
      setError('All fields are required.')
  }

  return (
    <div className='searchbar-main'>
      <div className='searchbar-cont'>
        <p className='tagline'>Planning to travel? We've got you
          covered with flights at the best price.
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
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='source' value={formData.source} onChange={handleChange}></input>
                  </div>
                  <div className='search-input'>
                  <label for='form'>To</label>
                      <input type="text" placeholder='Choose Aiport, City, Unique Co..' className='form-control' name='destination' value={formData.destination} onChange={handleChange}></input>
                      
                  </div>
                  </div>
                  <div className='depart-and-return'>
                    <div style={{display:'flex', flexDirection:'column'}} className='search-input'>
                    <label for='depart'>Depart</label>
                    <input type='date' name="date" className='datepicker' value={formData.date} onChange={handleChange}></input>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}} className='search-input'>
                    <label for="arrive">Arrive</label>
                    <input type='date' name='to' className='datepicker'></input>
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
                  <option selected value="ECONOMY">ECOMOMY</option>
                  <option value="PREMIUM ECONOMY">PREMIUM ECONOMY</option>
                  <option value="BUSINESS">BUSINESS</option>
                </select>
                  </div>
                </div>
              </div>
              <button className='search-button'>Search</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar