import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The base URL for the admin API running on port 8084
const BASE_URL = 'http://localhost:8084/admin';

// Async thunk to fetch all flights from the backend
export const fetchFlights = createAsyncThunk('flights/fetchFlights', async () => {
  const response = await axios.get(`${BASE_URL}/loadairlinesflight/IND`);  // Use actual airline_code parameter
  return response.data;
});

// Async thunk to add a new flight (if needed)
export const addNewFlight = createAsyncThunk('flights/addNewFlight', async (newFlight) => {
  const response = await axios.post(`${BASE_URL}/addnewflight`, newFlight);
  return response.data;
});

// Async thunk to update flight status (if needed)
export const updateFlightStatus = createAsyncThunk('flights/updateFlightStatus', async ({ flightID, status }) => {
  console.log(status)
  const response = await axios.put(`${BASE_URL}/updateflightstatus/${flightID}/${status}`);
  return response.data;
});

export const deleteFlight = createAsyncThunk('flights/deleteflight', async (flight_id) => {
    await axios.delete(`http://localhost:8084/admin/deleteflightbyid/${flight_id}`);
    return flight_id; // Return flight ID after deletion for updating the Redux state
  });

// Initial state for the flight slice
const initialState = {
  flights: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Slice definition
const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching flights
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
      })
      // Handle fulfilled state when flights are successfully fetched
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload; // Store fetched flights in state
      })
      // Handle rejected state if fetching flights fails
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle new flight addition
      .addCase(addNewFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload);
      })
      // Handle flight status update
      .addCase(updateFlightStatus.fulfilled, (state, action) => {
        const updatedFlight = action.payload;
        const index = state.flights.findIndex((flight) => flight.flight_id === updatedFlight.flight_id);
        if (index !== -1) {
          state.flights[index] = updatedFlight;
        }
      });
  }
});

// Export the async thunks and the reducer from the slice
export default flightSlice.reducer;

