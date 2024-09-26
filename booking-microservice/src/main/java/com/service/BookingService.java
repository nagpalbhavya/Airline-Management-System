package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.BookingDao;
import com.entity.Booking;
import com.entity.Booking.BookingStatus;
import com.entity.Passenger;
import java.util.*;

@Service
public class BookingService 
{
    @Autowired
    BookingDao bookingDao;

    public Booking createBooking(Booking booking)
    {
        return bookingDao.addBooking(booking);
    }

    public void updateStatus(Long bookingId, BookingStatus status)
    {
        bookingDao.updatestatus(bookingId, status);
    }

    public void listBookingByUserId(Long userId)
    {
        bookingDao.listBookingByUserId(userId);
    }

    public void listBookingByFlightId(Long flightId)
    {
        bookingDao.listBookingByFlightId(flightId);
    }

    public void confirmBookingAndAddPassengers(Long bookingId, List<Passenger> passengers)
    {
        bookingDao.confirmBookingAndAddPassengers(bookingId, passengers);
    }
}
