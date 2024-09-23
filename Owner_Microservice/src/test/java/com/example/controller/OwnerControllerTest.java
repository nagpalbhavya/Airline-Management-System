package com.example.controller;

import org.springframework.http.MediaType;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.verify;

import java.util.*;
import java.time.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.entity.Airline;
import com.entity.Airport;
import com.example.OwnerMicroserviceApplication;
import com.example.model.OffersAppliedModel;
import com.example.service.OwnerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.OfferModel;
import com.model.OfferResponseModel;

import reactor.core.publisher.Flux;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = OwnerMicroserviceApplication.class)
@AutoConfigureMockMvc
public class OwnerControllerTest 
{
    @MockBean
    OwnerService ownerService;

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
    public void testAddAirport()
    {
        Airport airport=new Airport(1L,"BLR","Kempagowda International Airport","Bangalore");
        Mockito.when(ownerService.addAirport(airport)).thenReturn(airport);

        try {
            mockMvc.perform(post("/owner/addAirport")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(airport)))
            .andExpect(status().isOk());
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    public void testDeleteAirport()
    {
        Airport airport=new Airport(1L,"BLR","Kempagowda International Airport","Bangalore");
        Mockito.when(ownerService.deleteAirport("BLR")).thenReturn(airport);
        //Mockito.when(ownerService.deleteAirport("DEL")).thenReturn(null);

        try {
            mockMvc.perform(delete("/owner/deleteAirport/{airportCode}","BLR"))
            .andExpect(status().isOk());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    public void testGetAllAirports()
    {
        Airport airport=new Airport(1L,"BLR","Kempagowda International Airport","Bangalore");
        List<Airport> airports=new ArrayList<>();
        airports.add(airport);
        airport=new Airport(2L,"DEL","Indira Gandhi International Airport","Delhi");
        airports.add(airport);

        Mockito.when(ownerService.getAllAirports()).thenReturn(airports);

        try {
            mockMvc.perform(get("/owner/getAllAirports"))
            .andExpect(status().isOk());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    public void testAddAirline()
    {
        Airline airline=new Airline(1L,"IndiGo","indigo logo","indigoadmin123","IND");

        Mockito.when(ownerService.addAirline(airline)).thenReturn(airline);

        try {
            mockMvc.perform(post("/owner/addAirline")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(airline)))
            .andExpect(status().isOk());
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }


    @Test
    public void testAddOffer()
    {
        //why does this work..?
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        OfferModel offer=new OfferModel("SAVE10","save 10%",10,validFrom,validUntil,1);
        try {
            mockMvc.perform(post("/owner/addOffer")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(offer)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$offerCode").value("SAVE10"));
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    public void testGetOffersApplied()
    {
        LocalDateTime validFrom=LocalDateTime.of(2024,04,10,12,0,0);
        LocalDateTime validUntil=LocalDateTime.of(2024,04,20,23,59,59);
        OfferResponseModel offer=new OfferResponseModel(1L,"SAVE10","DESC",10,validFrom,validUntil,1);

        Mockito.when(ownerService.getOffers()).thenReturn(Flux.just(offer));

        try {
            mockMvc.perform(get("/owner/getOffers"))
            .andExpect(status().isOk());
            //.andExpect(MockMvcResultMatchers.jsonPath("$",Matchers.hasSize(1)));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
