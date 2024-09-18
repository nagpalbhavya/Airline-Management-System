package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Airline;
import com.entity.Airport;
import com.model.OfferModel;
import com.model.OfferResponseModel;
import com.model.PromotionModel;
import com.model.FeedbackModel;
import com.service.AirlineService;
import com.service.AirportService;
import com.service.OwnerService;
import com.service.ScheduleService;

import reactor.core.publisher.Flux;

import java.util.*;

@RestController
@RequestMapping("/owner")
public class OwnerController 
{
    @Autowired
    OwnerService ownerService;

    //add airport
    @PostMapping("/addAirport")
    public Airport addAirport(@RequestBody Airport airport)
    {
        return ownerService.addAirport(airport);
    }

    //delete airport by unique code
    @DeleteMapping("/deleteAirport/{airportCode}")
    public String deleteAirport(@PathVariable String airportUniqueCode)
    {
        ownerService.deleteAirport(airportUniqueCode);
        return "Airport Deleted Successfully";
    }
    
    //add airline
    @PostMapping("/addAirline")
    public String addAirline(@RequestBody Airline airline)
    {
    	ownerService.addAirline(airline);
    	return "Airline added";
    }

    //load all airports
    @GetMapping("/getAllAirports")
    public List<Airport> getAllAirports()
    {
        return ownerService.getAllAirports();
    }

    //add offer
    @PostMapping("/addOffer")
    public String addOffer(@RequestBody OfferModel offer)
    {
		ownerService.addOffer(offer);
		return "Offer added";
    	
    }

    //disable / enable offer
    @PutMapping("/updateOfferList/{offerId}/{status}")
    public String updateOfferList(@PathVariable Long offerId, @PathVariable int status)
    {
		ownerService.updateOfferList(offerId, status);
		return "status updated";
    	
    }

    //get offers applied
    @GetMapping("/getOffers")
    public Flux<OfferResponseModel> getOffers()
    {
		return ownerService.getOffers();
    	
    }

    //add promotional offer
    @PostMapping("/addPromotion")
    public String addPromotion(@RequestBody PromotionModel promotion)
    {
		return null;
    	
    }

    //disable / enable promotional offer
    @PutMapping("/updatePromotionList/{promotionId}/{status}")
    public String updatePromotionList(@PathVariable Long promotionId, @PathVariable String status)
    {
		return null;
    	
    }

    public List<PromotionModel> getPromotion()
    {
		return null;
    	
    }

    public List<FeedbackModel> getFeedbackbyBookingId()
    {
		return null;
    	
    }
}

