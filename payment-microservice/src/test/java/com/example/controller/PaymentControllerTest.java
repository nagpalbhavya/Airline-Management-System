package com.example.controller;

import java.util.*;
import java.time.*;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ExceptionCollector;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;



import com.entity.Payment;
import com.entity.Payment.PaymentStatus;
import com.example.payment_microservice.PaymentMicroserviceApplication;
import com.example.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.PassengerModel;
import com.model.PaymentResponse;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = PaymentMicroserviceApplication.class)
@AutoConfigureMockMvc
public class PaymentControllerTest 
{  

    @MockBean
    PaymentService paymentService;

    @Autowired
    MockMvc mockMvc;
    
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup()
    {
        objectMapper=new ObjectMapper();
    }

    @Test
    public void testFindPaymentByBookingId() throws Exception 
    {
        Payment payment = new Payment(PaymentStatus.SUCCESSFUL,1001L,12037.0);
        Mockito.when(paymentService.getPaymentByBookingId(1001L)).thenReturn(payment);

        mockMvc.perform(get("/payments/booking/1001"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.bookingId").value(1001L));

    }

    @Test
    public void testFindPaymentByPaymentId() throws Exception
    {
        Payment payment=new Payment(1L,PaymentStatus.SUCCESSFUL,1002L,13000);
        Mockito.when(paymentService.getPaymentById(1L)).thenReturn(payment);

        mockMvc.perform(get("/payments/payment/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.paymentId").value(1L));
    }

    @Test void testProcessPayment() throws Exception
    {
        //localdatetime does not work, needs dependency
        List<PassengerModel> passengers=new ArrayList<>();
        LocalDateTime dob=LocalDateTime.of(2024,4,3,0,10,0);
        PassengerModel passenger= new PassengerModel("Rohit","Nair",dob,"ECONOMY",15);
        passengers.add(passenger);
        PaymentResponse response=new PaymentResponse(PaymentStatus.SUCCESSFUL, 1001L, 10000, passengers);

        Mockito.when(paymentService.addSuccessFulPayment(response)).thenReturn(response);
        mockMvc.perform(post("/payments/process")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(response)))
            .andExpect(status().isOk())
            .andExpect(content().string("Payment Successful"));
    }
}
