package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.entity.Payment;
import com.model.PassengerModel;
import com.model.PaymentResponse;

import reactor.core.publisher.Mono;

import java.util.*;

@Service
public class PaymentService 
{
    @Autowired
    private com.dao.paymentDAO paymentDAO;

    @Lazy
    @Autowired
    @Qualifier("webclient")
    private WebClient.Builder builder;

    public Payment addPayment(PaymentResponse payment)
    {
        return paymentDAO.addPayment(payment);
    }

    public void addSuccessFulPayment(PaymentResponse response)
    {
        System.out.println("addSuccessfulPayment method");
        paymentDAO.addPayment(response);
        System.out.println("added payment record");
        updateBookingStatusAndAddPassengers(response.getBookingId(),response.getPassengers());
    }

    public Payment getPaymentByBookingId(Long bookingId)
    {
        return paymentDAO.getPaymentByBookingId(bookingId);
    }

    public Payment getPaymentById(Long paymentId)
    {
        return paymentDAO.getPaymentById(paymentId);
    }


    public Void updateBookingStatusAndAddPassengers(Long bookingId, List<PassengerModel> passengers)
    {
        System.out.println("updating booking status..");
        return builder.build()
            .put()
            .uri("http://localhost:8080/booking/{bookingId}/confirm", bookingId)
            .bodyValue(passengers)
            .retrieve()
            .bodyToMono(Void.class)
            .block();
    }
}
