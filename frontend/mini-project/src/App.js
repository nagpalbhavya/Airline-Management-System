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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<GenericLandingPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
        </Routes>
    </Router>
  );
}

export default App;
