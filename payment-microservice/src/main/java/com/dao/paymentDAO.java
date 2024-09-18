package com.dao;

import com.entity.Payment;
import com.model.PaymentResponse;

public interface paymentDAO 
{
    Payment addPayment(PaymentResponse payment);
    Payment getPaymentByBookingId(Long bookingId);
    Payment getPaymentById(Long paymentId);
}
