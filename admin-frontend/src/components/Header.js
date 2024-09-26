import React from 'react';
import Greeting from './Greetings';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-section">
        <h1>SUNFLY</h1>
        <Greeting/>
      </div>
      
    </div>
  );
};

export default Header;
