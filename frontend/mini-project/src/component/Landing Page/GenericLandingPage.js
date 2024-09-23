import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import Offers from "./Offers"
import Footer from "./Footer"

const GenericLandingPage = () => {
  return (
    <div style={{backgroundColor:'#FEFFDD'}}>
        <Navbar/>
        <SearchBar/>
        <Offers/>
        <Footer/>
    </div>
  )
}

export default GenericLandingPage