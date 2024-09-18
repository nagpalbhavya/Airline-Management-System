package com.dao;


import java.util.List;
import java.util.Optional;

import com.entity.OfferApplied;

public interface OfferAppliedDao {
    List<OfferApplied> findAll();
    Optional<OfferApplied> findById(Long id);
    OfferApplied save(OfferApplied offerApplied);

    //add delete offer and promotion
}


