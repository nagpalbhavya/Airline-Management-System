import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import Offers from "./Offers"
import Footer from "./Footer"
import Cookies from 'js-cookie'

const GenericLandingPage = () => {
  const userFromCookie = Cookies.get('user');
  const user = userFromCookie ? JSON.parse(userFromCookie) : null;
  return (
    <div style={{backgroundColor:'#FEFFDD'}}>
        <Navbar isLoggedIn={user==null?false:true}/>
        <SearchBar/>
        <Offers/>
        <Footer/>
    </div>
  )
}

export default GenericLandingPage