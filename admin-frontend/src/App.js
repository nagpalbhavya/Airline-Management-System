import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import Header from './components/Header';
import Buttons from './components/Buttons';
import FlightTable from './components/FlightTable';
import RemoveFlightTable from './components/RemoveFlightTable'; // Import RemoveFlightTable
import UpdateFlightStatusTable from './components/UpdateFlightStatusTable'; // Import UpdateFlightStatusTable
import Info from './components/Info';
import AddFlightForm from './components/AddFlightForm'; // Import AddFlightForm
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <Info />
          <Buttons />

          {/* Define routes for each page */}
          <Routes>
            <Route path="/" element={<FlightTable />} /> {/* Default Route */}
            <Route path="/add-flight" element={<AddFlightForm />} />
            <Route path="/view-flights" element={<FlightTable />} />
            <Route path="/remove-flights" element={<RemoveFlightTable />} />
            <Route path="/update-flight-status" element={<UpdateFlightStatusTable />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
