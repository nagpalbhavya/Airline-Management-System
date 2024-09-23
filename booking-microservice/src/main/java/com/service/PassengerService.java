package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

import com.dao.PassengerDao;
import com.entity.Passenger;

@Service
public class PassengerService 
{
    @Autowired
    PassengerDao passengerDao;

    public void addPassenger(Long bookingId, List<Passenger> passengers)
    {
        passengerDao.addPassengers(bookingId, passengers);
    }

    public void getPassengersByBookingId(Long bookingId)
    {
        passengerDao.getPassengersByBookingId(bookingId);
    }
}
