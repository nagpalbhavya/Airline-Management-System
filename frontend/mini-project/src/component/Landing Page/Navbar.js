import React from 'react'
import Logo from '../Logo'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../../css/Landing Page/Navbar.css'
import Cookies from 'js-cookie'
import { logout } from '../../redux/userSlice'

const Navbar = ({isLoggedIn}) => {
  const navigate=useNavigate();
  const dispatch=useNavigate();

  const handleLoginButton=()=>{
    navigate('/login')
  }

  const handleLogoutButton=()=>{
    Cookies.remove('user')
    dispatch(logout())
    navigate(0);
  }
  return (
<nav className='navbar-main'>
<div className="navbar">
<div className='logo-navbar'>
        SUNFLY
    </div>
  <div className="navbar-links">
    {isLoggedIn ? (
      <>
        <button className='navbar-logout' onClick={handleLogoutButton}>Logout</button>
      </>
    ) : (
      <>
        <button className='navbar-login' onClick={handleLoginButton}>Login / Register</button>
      </>
    )}
  </div>
</div>
</nav>
  )
}

export default Navbar