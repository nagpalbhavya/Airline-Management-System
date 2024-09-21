package com.example.dao;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.annotation.AfterTestClass;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.entity.Payment;
import com.entity.Payment.PaymentStatus;
import com.example.payment_microservice.PaymentMicroserviceApplication;
import com.repo.PaymentRepo;

@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(classes = PaymentMicroserviceApplication.class)
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class PaymentDaoTest 
{
    @Autowired
    PaymentRepo paymentRepo;

    @Test
    public void testAddPayment()
    {
        Payment payment=new Payment(1L,PaymentStatus.SUCCESSFUL,1001L,10000);
        paymentRepo.save(payment);
        Iterable<Payment> itr=paymentRepo.findAll();
		Assertions.assertThat(itr).extracting(e->e.getBookingId()).containsOnly(1001L);
    }

    @Test
    public void deletePayment()
    {
        paymentRepo.deleteById(1L);
		Assertions.assertThat(paymentRepo.findAll()).isEmpty();
    }

    @AfterAll
    public void cleanUp()
    {
        paymentRepo.deleteAll();
    }
}
