package com.controller;

import com.entity.Airline;
import com.service.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/airlines")
public class AirlineController {

    @Autowired
    private AirlineService airlineService;

    @GetMapping("/list")
    public List<Airline> getAllAirlines() {
        return airlineService.getAllAirlines();
    }

    @GetMapping("/getairlinebyid/{id}")
    public Optional<Airline> getAirlineById(@PathVariable Long id) {
        return airlineService.getAirlineById(id);
    }

    @PostMapping("/createairline")
    public Airline createAirline(@RequestBody Airline airline) {
        return airlineService.saveAirline(airline);
    }

    @PutMapping("/updateairline/{id}")
    public Airline updateAirline(@PathVariable Long id, @RequestBody Airline airline) {
        airline.setAirlineId(id);
        return airlineService.saveAirline(airline);
    }

    @DeleteMapping("/deleteairline/{id}")
    public void deleteAirline(@PathVariable Long id) {
        airlineService.deleteAirline(id);
    }
}
