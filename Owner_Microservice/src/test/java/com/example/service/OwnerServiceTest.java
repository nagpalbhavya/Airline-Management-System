package com.example.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.entity.Airline;
import com.entity.Airport;
import com.example.OwnerMicroserviceApplication;
import com.example.dao.AirlineDao;
import com.example.dao.AirportDao;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = OwnerMicroserviceApplication.class)
public class OwnerServiceTest 
{
    @InjectMocks
    AirlineService airlineService;

    @InjectMocks
    AirportService airportService;

    @Mock
    AirlineDao airlineDao;

    @Mock
    AirportDao airportDao;

    @Mock
    ScheduleService scheduleService;

    @Test
    public void testSaveAirline()
    {
        Airline airline=new Airline(1L,"Indigo","Image","indigoadmin123","IND");
        airlineService.saveAirline(airline);

        Mockito.verify(airlineDao,Mockito.times(1)).save(airline);
    }

    @Test
    public void testGetAirlineById()
    {
        Airline airline=new Airline(1L,"Indigo","Image","indigoadmin123","IND");
        Mockito.when(airlineService.getAirlineById(1L)).thenReturn(airline);
        Mockito.when(airlineService.getAirlineById(2L)).thenReturn(null);
    }   

    @Test
    public void testGetAllAirlines()
    {
        Airline airline=new Airline(1L,"Indigo","Image","indigoadmin123","IND");
        List<Airline>airlines=new ArrayList<>();
        airlines.add(airline);
        airline=new Airline(2L,"Indigo","Image","indigoadmin123","IND");
        airlines.add(airline);

        Mockito.when(airlineService.getAllAirlines()).thenReturn(airlines);
        assertEquals(airlines.size(), 2);

    }

    @Test
    public void testSaveAirport()
    {
        Airport airport=new Airport(1L,"BLR","KIA","Bangalore");
        airportService.saveAirport(airport);

        Mockito.verify(airportDao,Mockito.times(1)).save(airport);
    }

    @Test
    public void testGetAllAirports()
    {
        Airport airport=new Airport(1L,"BLR","KIA","Bangalore");
        List<Airport>airports=new ArrayList<>();
        airports.add(airport);
        airport=new Airport(2L,"DEL","IGIA","Delhi");
        airports.add(airport);

        Mockito.when(airportService.getAllAirports()).thenReturn(airports);
        assertEquals(airports.size(), 2);
    }

    @Test
    public void testDeleteAirportByUniqueCode()
    {
        Airport airport=new Airport(1L,"BLR","KIA","Bangalore");
        airportService.deleteAirportByUniqueCode("BLR");

        Mockito.verify(airportDao,Mockito.times(1)).deleteByUniqueCode("BLR");
    }
    
}
