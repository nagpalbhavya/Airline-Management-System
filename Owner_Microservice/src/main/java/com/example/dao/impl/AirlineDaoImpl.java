package com.example.dao.impl;

import com.entity.Airline;
import com.example.dao.AirlineDao;
import com.example.repo.AirlineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Component
public class AirlineDaoImpl implements AirlineDao {

    @Autowired
    private AirlineRepository airlineRepository;

    @Override
    public List<Airline> findAll() {
        return airlineRepository.findAll();
    }

    @Override
    public Airline findById(Long id) {
        Optional<Airline> airline=airlineRepository.findById(id);
        if(airline.isPresent())
        return airline.get();
        else return null;
    }

    @Override
    public Airline save(Airline airline) {
        return airlineRepository.save(airline);
    }

    @Override
    public void deleteById(Long id) {
        airlineRepository.deleteById(id);
    }
}
