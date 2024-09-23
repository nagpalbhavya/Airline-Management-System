package com.example.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.entity.Offer;
import com.entity.OfferApplied;
import com.example.dao.OfferDao;

@ExtendWith(SpringExtension.class)
public class ServiceTest 
{
    @InjectMocks
    OfferService offerService;

    @Mock
    OfferDao offerDao;

    @Test
    public void testCreate()
	{
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        List<OfferApplied> offerAppliedList=new ArrayList();
        Offer offer=new Offer(1L,"SAVE10","DESC",10,validFrom,validUntil,1,offerAppliedList);

		offerService.saveOffer(offer);
		Mockito.verify(offerDao,Mockito.times(1)).save(offer);
	}

    @Test
    public void testGetAllOffers()
    {
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        List<OfferApplied> offerAppliedList=new ArrayList();
        Offer offer=new Offer(1L,"SAVE10","DESC",10,validFrom,validUntil,1,offerAppliedList);
        List<Offer>offers=new ArrayList<>();
        offers.add(offer);

        Mockito.when(offerService.getAllOffers()).thenReturn(offers);
        assertEquals(1, offers.size());
    }
}
