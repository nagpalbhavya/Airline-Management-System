package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.entity.Booking;
import com.entity.Booking.BookingStatus;
import com.entity.Passenger;
import com.repo.BookingRepo;
import com.service.PassengerService;

@Component
public class BookingDaoImpl implements BookingDao
{
    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    PassengerService passengerService;

    @Override
    public Booking addBooking(Booking booking) 
    {
       return bookingRepo.save(booking);
    }

    @Override
    public Booking updatestatus(Long bookingId, BookingStatus status) 
    {
        Booking booking=bookingRepo.findById(bookingId).get();
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> listBookingByUserId(Long userId) 
    {
        List<Booking> bookings=bookingRepo.findByUserId(userId);
        return bookings;
    }

    @Override
    public List<Booking> listBookingByFlightId(Long flightId) 
    {
        List<Booking> bookings=bookingRepo.findByUserId(flightId);
        return bookings;
    }
    @Override
    public void confirmBookingAndAddPassengers(Long bookingId, List<Passenger> passengers)
    {
        try {
            Booking booking=bookingRepo.findById(bookingId).orElseThrow(()->new Exception("Booking not found"));
            booking.setStatus(BookingStatus.CONIRMED);
            bookingRepo.save(booking);
            passengerService.addPassenger(bookingId, passengers);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }


}
