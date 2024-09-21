
package com.example.dao.impl;

import com.entity.Airport;
import com.example.dao.AirportDao;
import com.example.repo.AirportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Component
public class AirportDaoImpl implements AirportDao {

    @Autowired
    private AirportRepository airportRepository;

    @Override
    public List<Airport> findAll() {
        return airportRepository.findAll();
    }

    @Override
    public Optional<Airport> findById(Long id) {
        return airportRepository.findById(id);
    }

    @Override
    public Airport save(Airport airport) {
        return airportRepository.save(airport);
    }

    @Override
    public Airport deleteByUniqueCode(String code) {
    	Optional<Airport> airport=airportRepository.findByUniqueCode(code);
        if(airport.isPresent())
        {
            Airport a=airport.get();
            airportRepository.deleteById(a.getAirportId());
            return a;
        }
        else
        {
            System.out.println("Airport does not exist");
            return null;
        }
    }
}
