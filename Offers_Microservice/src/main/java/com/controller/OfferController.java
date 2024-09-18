package com.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.Offer;
import com.service.OfferService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping("/list")
    public List<Offer> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/getofferbyid/{id}")
    public Optional<Offer> getOfferById(@PathVariable Long id) {
        return offerService.getOfferById(id);
    }

    @PostMapping("/createoffer")
    public Offer createOffer(@RequestBody Offer offer) {
        return offerService.saveOffer(offer);
    }

    @PutMapping("/updateoffer/{id}")
    public Offer updateOffer(@PathVariable Long id, @RequestBody Offer offer) {
        offer.setOfferId(id);
        return offerService.saveOffer(offer);
    }

    @DeleteMapping("/deleteoffer/{id}")
    public void deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
    }
    
    @PutMapping("/updateOfferListing/{offerId}/{status}")
    public void updateOfferListing(@PathVariable Long offerId, @PathVariable int status)
    {
    	Optional<Offer> offer=offerService.getOfferById(offerId);
    	if(offer.isPresent())
    	{
    		Offer o=offer.get();
    		o.setIsActive(status);
    		offerService.saveOffer(o);
    	}
    	
    }
}
