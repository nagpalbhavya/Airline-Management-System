package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Passenger;

public interface PassengerRepo extends JpaRepository<Passenger,Long>
{

    List<Passenger> findByBooking_BookingId(Long bookingId);

}
