package com.example.controller;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.*;

import com.entity.Offer;
import com.entity.OfferApplied;
import com.example.OffersMicroserviceApplication;
import com.example.service.OfferService;
import com.example.service.PromotionService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = OffersMicroserviceApplication.class)
@AutoConfigureMockMvc
public class ControllerTest 
{
    @MockBean
    OfferService offerService;

    @MockBean
    PromotionService promotionService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    public void setUp()
    {
        objectMapper=new ObjectMapper();
    }

    @Test
    public void testGetAllOffers() throws Exception
    {
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        List<OfferApplied> offerAppliedList=new ArrayList();
        Offer offer=new Offer(1L,"SAVE10","DESC",10,validFrom,validUntil,1,offerAppliedList);
        List<Offer>offers=new ArrayList<>();
        offers.add(offer);
        Mockito.when(offerService.getAllOffers()).thenReturn(offers);

        mockMvc.perform(get("/offers/list"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", Matchers.hasSize(1)));
    }

    @Test
    public void testGetOfferById()
    {
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        List<OfferApplied> offerAppliedList=new ArrayList();
        Offer offer=new Offer(1L,"SAVE10","DESC",10,validFrom,validUntil,1,offerAppliedList);
        Mockito.when(offerService.getOfferById(1L)).thenReturn(offer);

        try {
            mockMvc.perform(get("/offers/getofferbyid/{id}",1L))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.offerCode").value("SAVE10"));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    public void testCreateOffer()
    {
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        List<OfferApplied> offerAppliedList=new ArrayList();
        Offer offer=new Offer(1L,"SAVE10","DESC",10,validFrom,validUntil,1,offerAppliedList);

        Mockito.when(offerService.saveOffer(offer)).thenReturn(offer);
    }

    @Test
    public void testUpdateOffer()
    {

    }

    @Test
    public void testDeleteOffer()
    {

    }

    @Test
    public void testUpdateOfferListing()
    {

    }
}
