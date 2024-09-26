import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8084/admin';

// Thunks for async actions
// export const fetchFlightsByAirlineCode = createAsyncThunk(
//   'flights/fetchFlightsByAirlineCode',
//   async (airlineCode) => {
//     const response = await axios.get(`${API_BASE_URL}/loadairlinesflight/${airlineCode}`);
//     console.log(response)
//     return response.data;
//   }
// );

export const addNewFlight = createAsyncThunk(
  'flights/addNewFlight',
  async (flightData) => {
    const response = await axios.post(`http://localhost:8084/admin/addnewflight`, flightData);
    return response.data;
  }
);
export const deleteFlight = createAsyncThunk('flights/deleteFlight', async (flight_id) => {
  await axios.delete(`${API_BASE_URL}/${flight_id}`);
  return flight_id; // Return flight ID after deletion for updating the Redux state
});

// export const deleteFlight = createAsyncThunk(
//   'flights/deleteFlight',
//   async (flightId) => {
//     await axios.delete(`${API_BASE_URL}/deleteflightbyid/${flightId}`);
//     return flightId;
//   }
// );

// export const updateFlightStatus = createAsyncThunk(
//   'flights/updateFlightStatus',
//   async ({ flightId, status }) => {
//     const response = await axios.put(`${API_BASE_URL}/updateflightstatus/${flightId}/${status}`);
//     return { flightId, status: response.data.status };
//   }
// );

// Thunk to update flight status
export const updateFlightStatus = createAsyncThunk('flights/updateFlightStatus', async ({ flightId, status }) => {
  // Send a PATCH request to update the flight status in the backend
  await axios.put(`http://localhost:8084/admin/updateflightstatus/${flightId}/${status}`);
  
  // Return updated flightId and status to update the Redux store
  return { flightId, status };
});

// Initial state
const initialState = {
  selectedButton: '',
  showFlightTable: false,
  showAddFlightForm: false,
  showRemoveFlightTable: false,
  showUpdateFlightStatusTable: false,
  flights: [], // Array to store flight data
  status: 'idle', // For loading states
  error: null, // For error handling
};

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
      state.showFlightTable = action.payload === 'viewFlights';
      state.showAddFlightForm = action.payload === 'addFlights';
      state.showRemoveFlightTable = action.payload === 'removeFlights';
      state.showUpdateFlightStatusTable = action.payload === 'updateStatus';
    },
  },
  extraReducers: (builder) => {
    // Handle fetchFlightsByAirlineCode
    // builder
      // .addCase(fetchFlightsByAirlineCode.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchFlightsByAirlineCode.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.flights = action.payload; // Store fetched flights
      // })
      // .addCase(fetchFlightsByAirlineCode.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // });

    // Handle addNewFlight
    builder
      .addCase(addNewFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload); // Add the new flight
      });

    // Handle deleteFlight
    builder
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((flight) => flight.id !== action.payload);
      });

    // Handle updateFlightStatus
    builder
      .addCase(updateFlightStatus.fulfilled, (state, action) => {
        const { flightId, status } = action.payload;
        const flight = state.flights.find((flight) => flight.id === flightId);
        if (flight) {
          flight.status = status; // Update flight status
        }
      });
  },
});

// Export actions
export const { setSelectedButton } = dashboardSlice.actions;
export default dashboardSlice.reducer;
