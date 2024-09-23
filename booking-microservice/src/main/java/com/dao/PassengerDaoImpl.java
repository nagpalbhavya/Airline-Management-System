package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.entity.Booking;
import com.entity.Passenger;
import com.repo.BookingRepo;
import com.repo.PassengerRepo;

@Component
public class PassengerDaoImpl implements PassengerDao
{
    @Autowired
    PassengerRepo passengerRepo;

    @Autowired
    BookingRepo bookingRepo;

    @Override
    public List<Passenger> addPassengers(Long bookingId, List<Passenger> passengers) 
    {

        try {
            Booking booking = bookingRepo.findById(bookingId).orElseThrow(()->new Exception("booking not found"));
            passengers.forEach(p->{
                Passenger passenger=new Passenger();
                passenger.setBooking(booking);
                passenger.setPassengerId(p.getPassengerId());
                passenger.setFirstName(p.getFirstName());
                passenger.setLastName(p.getLastName());
                passenger.setDob(p.getDob());
                passenger.setBaggageAllowance(p.getBaggageAllowance());
                passenger.setTravelClass(p.getTravelClass());
                passengerRepo.save(passenger);
            });
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return passengers;
    }

    @Override
    public List<Passenger> getPassengersByBookingId(Long bookingId) 
    {
        return passengerRepo.findByBooking_BookingId(bookingId);
    }

}
