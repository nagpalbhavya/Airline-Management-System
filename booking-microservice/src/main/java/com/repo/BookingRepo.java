package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Booking;

public interface BookingRepo extends JpaRepository<Booking,Long>
{

    List<Booking> findByUserId(Long userId);

}
