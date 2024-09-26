import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddPromotions from './components/AddPromotions';
import AddAirlines from './components/AddAirlines';
import AddOffers from './components/AddOffers';
import AddAirports from './components/AddAirports';
import ViewFlights from './components/ViewFlights';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/add-airports" element={<AddAirports />} />
          <Route path="/add-airlines" element={<AddAirlines />} />
          <Route path="/add-offers" element={<AddOffers />} />
          <Route path="/add-promotions" element={<AddPromotions />} />
          <Route path="/view-flights" element={<ViewFlights />} /> {/* Fix applied here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
