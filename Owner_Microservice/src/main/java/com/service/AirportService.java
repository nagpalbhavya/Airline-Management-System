package com.service;

import com.dao.AirportDao;
import com.entity.Airport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportDao airportDao;

    public List<Airport> getAllAirports() {
        return airportDao.findAll();
    }

    public Optional<Airport> getAirportById(Long id) {
        return airportDao.findById(id);
    }

    public Airport saveAirport(Airport airport) {
        return airportDao.save(airport);
    }

    public void deleteAirportByUniqueCode(String uniqueCode) {
        airportDao.deleteByUniqueCode(uniqueCode);
    }
}
