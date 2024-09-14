package com.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.OfferDao;
import com.entity.Offer;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferDao offerDAO;

    public List<Offer> getAllOffers() {
        return offerDAO.findAll();
    }

    public Optional<Offer> getOfferById(Long id) {
        return offerDAO.findById(id);
    }

    public Offer saveOffer(Offer offer) {
        return offerDAO.save(offer);
    }

    public void deleteOffer(Long id) {
        offerDAO.deleteById(id);
    }
}
