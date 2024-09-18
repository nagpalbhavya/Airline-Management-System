package com.dao;

import com.entity.Passenger;
import java.util.*;

public interface PassengerDao 
{
    public List<Passenger> addPassengers(Long bookingId, List<Passenger> passengers);
    public List<Passenger> getPassengersByBookingId(Long bookingId);
}
