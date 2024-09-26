import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from './redux/dashboardSlice';
import flightsReducer from './redux/FlightSlice';

const store = configureStore({
  reducer: {
    flights: flightsReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
