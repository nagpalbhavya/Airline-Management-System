package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Offer;
import com.entity.Promotion;
import com.example.dao.OfferDao;
import com.example.dao.PromotionDao;

import jakarta.transaction.Transactional;

@Service
public class PromotionService 
{
	@Autowired
    private PromotionDao promotionDao;

    public List<Promotion> getAllPromotions() {
        return promotionDao.findAll();
    }

    public Optional<Promotion> getPromotionById(Long id) {
        return promotionDao.findById(id);
    }

    @Transactional
    public Promotion savePromotion(Promotion promotion) {
        return promotionDao.save(promotion);
    }

    @Transactional
    public void deletePromotion(Long id) {
        promotionDao.deleteById(id);
    }
}
