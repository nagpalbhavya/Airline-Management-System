package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Payment;
import com.model.PaymentResponse;
import com.service.PaymentService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/payments")
public class PaymentController 
{
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/booking/{bookingId}")
    public Payment getPaymentByBookingId(@PathVariable Long bookingId)
    {
        return paymentService.getPaymentByBookingId(bookingId);
    }

    @GetMapping("/payment/{paymentId}")
    public Payment getPaymentById(@PathVariable Long paymentId)
    {
        return paymentService.getPaymentById(paymentId);
    }

    @PutMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody PaymentResponse response)
    {
        boolean paymentStatus=processPaymentGateway(response);
        if(paymentStatus==true)
        {
            System.out.println("entrring process payment method");
            paymentService.addSuccessFulPayment(response);
            return ResponseEntity.ok("Payment Successful");
        }
        else
        {
            paymentService.addPayment(response);
            return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body("an error occured");
        }
    }


    private boolean processPaymentGateway(PaymentResponse payment)
    {
        //payment status logic
        return true;
    }
}
