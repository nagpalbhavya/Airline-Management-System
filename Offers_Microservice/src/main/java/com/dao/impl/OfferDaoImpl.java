package com.dao.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.OfferDao;
import com.entity.Offer;
import com.repo.OfferRepository;

import java.util.List;
import java.util.Optional;

@Component
public class OfferDaoImpl implements OfferDao {

    @Autowired
    private OfferRepository offerRepository;

    @Override
    public List<Offer> findAll() {
        return offerRepository.findAll();
    }

    @Override
    public Optional<Offer> findById(Long id) {
        return offerRepository.findById(id);
    }

    @Override
    public Offer save(Offer offer) {
        return offerRepository.save(offer);
    }

    @Override
    public void deleteById(Long id) {
        offerRepository.deleteById(id);
    }
}
