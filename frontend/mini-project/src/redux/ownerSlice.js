import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8083/owner';

// Async thunks
export const addOffer = createAsyncThunk('owner/addOffer', async (offerData) => {
  const response = await axios.post(`${baseURL}/addOffer`, offerData);
  return response.data;
});

// Async thunk for updating an offer's status (activate/deactivate)
export const updateOffer = createAsyncThunk('owner/updateOffer', async ({ offerId, status }) => {
  const response = await axios.put(`${baseURL}/updateOfferList/${offerId}/${status}`);
  return { offerId, status };
});

// Async thunk for fetching all offers
export const fetchOffers = createAsyncThunk('owner/fetchOffers', async () => {
  const response = await axios.get(`${baseURL}/getOffers`);
  return response.data;
});

export const fetchFlights = createAsyncThunk('owner/fetchFlights', async () => {
  const response = await axios.get(`${baseURL}/displayallflights`);
  return response.data;
});

// Async thunk to disable or enable a flight
// export const updateFlightStatus = createAsyncThunk('owner/updateFlightStatus', async (flightId,val) => {
//   const response = await axios.put(`${baseURL}/changeflightlisting/${flightId}/${val}`);
//   return response.data;
// });

export const updateFlightStatus = createAsyncThunk(
  'owner/updateFlightStatus',
  async ({ flightId, is_disabled_val }) => {
    const response = await axios.put(`${baseURL}/changeflightlisting/${flightId}/${is_disabled_val}`);
    return response.data;
  }
);





export const fetchAirlines = createAsyncThunk('owner/getAllAirlines', async () => {
    const response = await axios.get(`${baseURL}/getAllAirlines`);
    return response.data;
  });
  
  // Thunk to add an airline
  export const addAirline = createAsyncThunk('owner/addAirline', async (airlineData) => {
    const response = await axios.post(`${baseURL}/addAirline`, airlineData);
    return response.data;
  });
  
  // Thunk to delete an airline
  export const deleteAirline = createAsyncThunk('owner/deleteAirline', async (airlineId) => {
    await axios.delete(`${baseURL}/deleteAirline/${airlineId}`);
    return airlineId;
  });
  
export const addAirport = createAsyncThunk('owner/addAirport', async (airport) => {
  const response = await axios.post(`${baseURL}/addAirport`, airport);
  return response.data;
});

export const deleteAirport = createAsyncThunk('owner/deleteAirport', async (airportCode) => {
  await axios.delete(`${baseURL}/deleteAirport/${airportCode}`);
  return airportCode;
});

export const fetchAirports = createAsyncThunk('owner/fetchAirports', async () => {
  const response = await axios.get(`${baseURL}/getAllAirports`); // Adjust API endpoint as needed
  return response.data;
});



export const fetchPromotions = createAsyncThunk('owner/fetchPromotions', async () => {
  const response = await axios.get(`${baseURL}/getPromotions`);
  return response.data;
});

export const addPromotion = createAsyncThunk('owner/addPromotion', async (promotionData) => {
  const response = await axios.post(`${baseURL}/addPromotion`, promotionData);
  return response.data;
});

// Update Promotion Status
export const updatePromotion = createAsyncThunk('owner/updatePromotion', async ({ promotionId, status }) => {
  const response = await axios.put(`${baseURL}/updatePromotionList/${promotionId}/${status}`);
  return response.data;
});

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    airports: [],
    airlines: [],
    offers: [],
    promotions: [],
    flights: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAirport.fulfilled, (state, action) => {
        state.airports.push(action.payload);
      })
      .addCase(fetchAirlines.fulfilled, (state, action) => {
        state.airlines = action.payload;
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.airports = action.payload; // Populate airports with fetched data
      })
      // Handle addAirline
      .addCase(addAirline.fulfilled, (state, action) => {
        state.airlines.push(action.payload);
      })
      // Handle deleteAirline
      .addCase(deleteAirline.fulfilled, (state, action) => {
        state.airlines = state.airlines.filter(airline => airline.airlineId !== action.payload);
      })



      .addCase(deleteAirport.fulfilled, (state, action) => {
        state.airports = state.airports.filter(airport => airport.uniqueCode !== action.payload);
      })


      .addCase(addOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      // Handle Update Offer
      .addCase(updateOffer.fulfilled, (state, action) => {
        const { offerId, status } = action.payload;
        const offer = state.offers.find((offer) => offer.offerId === offerId);
        if (offer) {
          offer.isActive = status;
        }
      })
      // Handle Fetch Offers
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.error = action.error.message;
      })
           

      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.promotions = action.payload;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.promotions.push(action.payload);
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        const { promotionId, status } = action.meta.arg;
        const promotion = state.promotions.find((promo) => promo.promotionId === promotionId);
        if (promotion) {
          promotion.isActive = status;
        }
      })

      
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.error = action.error.message;
      })

      
      .addCase(updateFlightStatus.fulfilled, (state, action) => {
        // Find the flight in the state and update its status
        const updatedFlight = action.payload;
        const index = state.flights.findIndex((flight) => flight.flight_id === updatedFlight.flight_id);
        if (index !== -1) {
          state.flights[index] = updatedFlight;
        }
      })
      .addCase(updateFlightStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default ownerSlice.reducer;
