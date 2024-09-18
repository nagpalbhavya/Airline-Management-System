package com.entity;

import java.time.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Passenger 
{
    @Id
    @GeneratedValue
    private Long passengerId;

    @ManyToOne
    @JoinColumn(name="booking_id", nullable = false)
    private Booking booking;

    private String firstName;
    private String lastName;
    private LocalDateTime dob;
    private String travelClass;
    private int baggageAllowance;
}
