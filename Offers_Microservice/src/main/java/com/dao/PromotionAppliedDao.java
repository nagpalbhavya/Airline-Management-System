package com.dao;

import java.util.List;
import java.util.Optional;

import com.entity.OfferApplied;
import com.entity.PromotionApplied;

public interface PromotionAppliedDao 
{
	List<PromotionApplied> findAll();
    Optional<PromotionApplied> findById(Long id);
    PromotionApplied save(PromotionApplied promotionApplied);
}
