


import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Greeting from './Greeting';
import TimeDisplay from './TimeDisplay';

function NavBarComponent() {
  // Use useLocation to get the current path
  const location = useLocation();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>SUNFLY</Navbar.Brand>
      <br></br>
      <br></br>
      <Greeting/>
      <br></br>
      <TimeDisplay/>
      <br></br>
      
      {/* Container for the buttons */}
      <div style={{display: 'flex', justifyContent: 'center', width: '100vw', gap: '20px'}}>
        <Nav className="mr-auto" style={{display: 'flex', gap: '15px', marginLeft:'-80px'}}>
          
          {/* Add Airports button */}
          <button
            style={location.pathname === '/add-airports' ? activeButtonStyle : buttonStyle}
          >
            <Nav.Link as={Link} to="/add-airports" style={linkStyle}>
              Add Airports
            </Nav.Link>
          </button>

          {/* Add Airlines button */}
          <button
            style={location.pathname === '/add-airlines' ? activeButtonStyle : buttonStyle}
          >
            <Nav.Link as={Link} to="/add-airlines" style={linkStyle}>
              Add Admins
            </Nav.Link>
          </button>

          {/* Add Offers button */}
          <button
            style={location.pathname === '/add-offers' ? activeButtonStyle : buttonStyle}
          >
            <Nav.Link as={Link} to="/add-offers" style={linkStyle}>
              Add Offers
            </Nav.Link>
          </button>

          {/* Add Promotions button */}
          <button
            style={location.pathname === '/add-promotions' ? activeButtonStyle : buttonStyle}
          >
            <Nav.Link as={Link} to="/add-promotions" style={linkStyle}>
              Add Promotions
            </Nav.Link>
          </button>

          {/* View Flights button */}
          <button
            style={location.pathname === '/view-flights' ? activeButtonStyle : buttonStyle}
          >
            <Nav.Link as={Link} to="/view-flights" style={linkStyle}>
              View Flights
            </Nav.Link>
          </button>
        </Nav>
      </div>
    </Navbar>
  );
}

// Default button style (grey)
const buttonStyle = {
  backgroundColor: '#D3D3D3', // Grey background
  border: 'none',
  borderRadius: '20px',
  padding: '10px 50px',
  cursor: 'pointer',
  color: 'black',
  fontSize: '16px',
};

// Active button style (blue)
const activeButtonStyle = {
  backgroundColor: '#007bff', // Blue background when active
  border: 'none',
  borderRadius: '70px',
  padding: '10px 20px',
  cursor: 'pointer',
  color: 'white', // Change text to white when active
  fontSize: '16px',
};

// Link style (remains consistent)
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit', // Inherits color from button
};

export default NavBarComponent;
