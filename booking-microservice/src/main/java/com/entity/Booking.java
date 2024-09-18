package com.entity;

import java.time.LocalDateTime;
import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking 
{
    @Id
    @GeneratedValue
    private Long bookingId;

    // @ManyToOne
    // @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    // @ManyToOne
    // @JoinColumn(name = "flight_id", nullable = false)
    private Long flightId;

    private LocalDateTime bookingDate;
    private double totalCost;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Passenger> passengers;

    public enum BookingStatus{
        PENDING,
        CONIRMED,
        CANCELLED
    }

}
