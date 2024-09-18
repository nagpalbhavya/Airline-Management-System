package com.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.OfferAppliedDao;
import com.entity.OfferApplied;
import com.repo.OfferAppliedRepository;

import java.util.List;
import java.util.Optional;

@Component
public class OfferAppliedDaoImpl implements OfferAppliedDao {

    @Autowired
    private OfferAppliedRepository offerAppliedRepository;

    @Override
    public List<OfferApplied> findAll() {
        return offerAppliedRepository.findAll();
    }

    @Override
    public Optional<OfferApplied> findById(Long id) {
        return offerAppliedRepository.findById(id);
    }

    @Override
    public OfferApplied save(OfferApplied offerApplied) {
        return offerAppliedRepository.save(offerApplied);
    }
}
