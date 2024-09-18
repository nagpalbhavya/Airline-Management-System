
package com.dao.impl;

import com.dao.AirportDao;
import com.entity.Airport;
import com.repo.AirportRepository;
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
    public void deleteByUniqueCode(String code) {
    	Optional<Airport> airport=airportRepository.findByUniqueCode(code);
        if(airport.isPresent())
        {
            Airport a=airport.get();
            airportRepository.deleteById(a.getAirportId());
            System.out.println("Airport deleted");
        }
        else
        {
            System.out.println("Airport does not exist");
        }
    }
}
