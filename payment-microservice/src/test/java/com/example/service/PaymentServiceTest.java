package com.example.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.*;
import java.time.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.entity.Payment;
import com.entity.Payment.PaymentStatus;
import com.example.dao.PaymentDaoImpl;
import com.example.payment_microservice.PaymentMicroserviceApplication;
import com.model.PassengerModel;
import com.model.PaymentResponse;
import com.repo.PaymentRepo;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = PaymentMicroserviceApplication.class)
public class PaymentServiceTest 
{
    @InjectMocks
	PaymentService paymentService;
	
	@Mock
	PaymentDaoImpl paymentDao;
	
	public void init()
	{
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	public void testCreate()
	{
        List<PassengerModel> passengers=new ArrayList<>();
        LocalDateTime dob=LocalDateTime.of(2024,4,3,0,10,0);
        PassengerModel passenger= new PassengerModel("Rohit","Nair",dob,"ECONOMY",15);
        passengers.add(passenger);
        PaymentResponse response=new PaymentResponse(PaymentStatus.SUCCESSFUL, 1001L, 10000, passengers);

		paymentService.addPayment(response);
		Mockito.verify(paymentDao,Mockito.times(1)).addPayment(response);
	}

	@Test
	public void testGetPaymentByBookingId()
	{
		Payment payment=new Payment(PaymentStatus.SUCCESSFUL,1001L,10000);
		List<Payment> payments=new ArrayList<>();
		payments.add(payment);
		payment=new Payment(PaymentStatus.FAILED,1002L,10000);
		payments.add(payment);

		Mockito.when(paymentService.getPaymentByBookingId(1002L)).thenReturn(payment);
		Mockito.when(paymentService.getPaymentByBookingId(1005L)).thenReturn(null);
	}

	@Test
	public void testGetPaymentByPaymentId()
	{
		Payment payment=new Payment(1L,PaymentStatus.SUCCESSFUL,1001L,10000);
		List<Payment> payments=new ArrayList<>();
		payments.add(payment);
		payment=new Payment(2L,PaymentStatus.FAILED,1002L,10000);
		payments.add(payment);

		Mockito.when(paymentService.getPaymentByBookingId(2L)).thenReturn(payment);
		Mockito.when(paymentService.getPaymentByBookingId(5L)).thenReturn(null);
	}
}
