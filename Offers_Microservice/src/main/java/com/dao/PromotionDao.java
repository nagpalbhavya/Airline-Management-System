package com.dao;

import java.util.List;
import java.util.Optional;

import com.entity.Offer;
import com.entity.Promotion;

public interface PromotionDao 
{
	List<Promotion> findAll();
    Optional<Promotion> findById(Long id);
    Promotion save(Promotion promotion);
    void deleteById(Long id);
}
