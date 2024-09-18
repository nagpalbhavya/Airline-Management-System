package com.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.OfferDao;
import com.entity.Offer;

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

    public Optional<Offer> getOfferById(Long id) {
        return offerDAO.findById(id);
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
