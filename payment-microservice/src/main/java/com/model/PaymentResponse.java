package com.model;

import com.entity.Payment.PaymentStatus;

import java.util.*;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse 
{
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private Long bookingId;
    private double amount;
    private List<PassengerModel> passengers;
}   
