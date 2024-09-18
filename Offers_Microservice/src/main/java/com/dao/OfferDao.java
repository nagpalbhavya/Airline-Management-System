package com.dao;



import java.util.List;
import java.util.Optional;

import com.entity.Offer;

public interface OfferDao {
    List<Offer> findAll();
    Optional<Offer> findById(Long id);
    Offer save(Offer offer);
    void deleteById(Long id);
}

