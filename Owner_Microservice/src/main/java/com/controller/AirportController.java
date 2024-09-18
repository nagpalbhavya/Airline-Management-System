package com.controller;

import com.entity.Airport;
import com.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/airports")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping("/list")
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    @GetMapping("/getairportbyid/{id}")
    public Optional<Airport> getAirportById(@PathVariable Long id) {
        return airportService.getAirportById(id);
    }

    @PostMapping("/createairport")
    public Airport createAirport(@RequestBody Airport airport) {
        return airportService.saveAirport(airport);
    }

    @PutMapping("/updateairport/{id}")
    public Airport updateAirport(@PathVariable Long id, @RequestBody Airport airport) {
        airport.setAirportId(id);
        return airportService.saveAirport(airport);
    }

    @DeleteMapping("/deleteairport/{code}")
    public void deleteAirport(@PathVariable String code) {
        airportService.deleteAirportByUniqueCode(code);
    }
}
