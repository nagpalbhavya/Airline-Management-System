package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Booking;
import com.entity.Booking.BookingStatus;
import com.entity.Passenger;
import com.service.BookingService;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/booking")
public class BookingController 
{
    @Autowired
    BookingService bookingService;

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking)
    {
        return bookingService.createBooking(booking);
    }

    @PutMapping("/updateStatus/{bookingId}/{status}")
    public void updateStatus(@PathVariable Long bookingId, @PathVariable BookingStatus status)
    {
        bookingService.updateStatus(bookingId, status);
    }

    @GetMapping("/getByUser/{userId}")
    public void listBookingByUserId(@PathVariable Long userId)
    {
        bookingService.listBookingByUserId(userId);
    }

    @GetMapping("/getByFlight/{flightId}")
    public void listBookingByFlightId(@PathVariable Long flightId)
    {
        bookingService.listBookingByFlightId(flightId);
    }

    @PutMapping("/{bookingId}/confirm")
    public void confirmBookingAndAddPassengers(@PathVariable Long bookingId, @RequestBody List<Passenger> passengers)
    {
        System.out.println("inside confirm booking method");
        bookingService.confirmBookingAndAddPassengers(bookingId, passengers);
    }
}
