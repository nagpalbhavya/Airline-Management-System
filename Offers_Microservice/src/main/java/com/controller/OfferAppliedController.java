package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.OfferApplied;
import com.service.OfferAppliedService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/offers-applied")
public class OfferAppliedController {

    @Autowired
    private OfferAppliedService offerAppliedService;

    @GetMapping("/list")
    public List<OfferApplied> getAllOfferApplied() {
        return offerAppliedService.getAllOfferApplied();
    }

    @GetMapping("/getofferappliedbyid/{id}")
    public Optional<OfferApplied> getOfferAppliedById(@PathVariable Long id) {
        return offerAppliedService.getOfferAppliedById(id);
    }

    @PostMapping("/createofferapplied/{bookingId}/{offerId}")
    public OfferApplied createOfferApplied(@PathVariable Long offerId, @PathVariable Long bookingId) {
        return offerAppliedService.saveOfferApplied(offerId, bookingId);
    }
}
