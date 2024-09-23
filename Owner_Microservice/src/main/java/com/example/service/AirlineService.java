package com.example.service;

import com.entity.Airline;
import com.example.dao.AirlineDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

    @Autowired
    private AirlineDao airlineDao;

    public List<Airline> getAllAirlines() {
        return airlineDao.findAll();
    }

    public Airline getAirlineById(Long id) {
        return airlineDao.findById(id);
    }

    public Airline saveAirline(Airline airline) {
        return airlineDao.save(airline);
    }

    public void deleteAirline(Long id) {
        airlineDao.deleteById(id);
    }
}
