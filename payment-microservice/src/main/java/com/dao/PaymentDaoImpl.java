package com.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.entity.Payment;
import com.model.PaymentResponse;
import com.repo.PaymentRepo;

@Component
public class PaymentDaoImpl implements paymentDAO
{
    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public Payment addPayment(PaymentResponse payment) 
    {
        return paymentRepo.save(new Payment(payment.getStatus(),payment.getBookingId(),payment.getAmount()));
    }

    @Override
    public Payment getPaymentByBookingId(Long bookingId) 
    {
       return paymentRepo.findByBookingId(bookingId);
    }

    @Override
    public Payment getPaymentById(Long paymentId) 
    {
        return paymentRepo.findById(paymentId).get();
    }


}
