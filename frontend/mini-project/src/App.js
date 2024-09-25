import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import GenericLandingPage from './component/Landing Page/GenericLandingPage';
import FlightsResultsPage from './component/FlightsResultsPage';
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import FlightDetail from './component/FlightDetail';
import Payment from './component/payment-component/Payment'
import Checkout from './component/Checkout'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<GenericLandingPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/flights" element={<FlightsResultsPage/>}/>
          <Route path="/flights/:flightId" element={<FlightDetail/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          {/* <Route path="/payment" element={<Payment/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;
