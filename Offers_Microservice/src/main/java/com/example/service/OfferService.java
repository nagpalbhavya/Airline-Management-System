package com.example.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Offer;
import com.example.dao.OfferDao;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferDao offerDAO;

    public List<Offer> getAllOffers() {
        return offerDAO.findAll();
    }

    public Offer getOfferById(Long id) {
        Optional<Offer>offer=offerDAO.findById(id);
        if(offer.isPresent())
        return offer.get();
        else return null;
    }

    @Transactional
    public Offer saveOffer(Offer offer) {
        return offerDAO.save(offer);
    }

    @Transactional
    public void deleteOffer(Long id) {
        offerDAO.deleteById(id);
    }
}
