package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.entity.Passenger;
import com.service.PassengerService;

@RestController
@RequestMapping("/passenger")
public class PassengerController 
{
    @Autowired
    PassengerService passengerService;

    @PostMapping("/addPassengers/{bookingId}")
    public void addPassenger(@PathVariable Long bookingId, @RequestBody List<Passenger> passengers)
    {
        passengerService.addPassenger(bookingId, passengers);
    }

    @GetMapping("/getPassengersByBookingId/{bookingId}")
    public void getPassengersByBookingId(@PathVariable Long bookingId)
    {
        passengerService.getPassengersByBookingId(bookingId);
    }
}
