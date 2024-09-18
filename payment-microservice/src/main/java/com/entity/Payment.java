package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor

public class Payment 
{
    @Id
    @GeneratedValue
    private Long paymentId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private Long bookingId;
    private double amount;

    public enum PaymentStatus
    {
        FAILED, SUCCESSFUL
    }

    public Payment(PaymentStatus status, Long bookingId, double amount)
    {
        this.status=status;
        this.bookingId=bookingId;
        this.amount=amount;
    }
}
