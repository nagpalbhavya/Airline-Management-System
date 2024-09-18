package com.dao;

import java.util.*;
import com.entity.Booking;
import com.entity.Passenger;
import com.entity.Booking.BookingStatus;

public interface BookingDao 
{
    public Booking addBooking(Booking booking);
    public Booking updatestatus(Long bookingId, BookingStatus status);
    public List<Booking> listBookingByUserId(Long userId);
    public List<Booking> listBookingByFlightId(Long flightId);
    public void confirmBookingAndAddPassengers(Long bookingId, List<Passenger> passengers);
    
}
