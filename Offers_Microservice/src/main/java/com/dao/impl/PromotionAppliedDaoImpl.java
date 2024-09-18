package com.dao.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.PromotionAppliedDao;
import com.entity.OfferApplied;
import com.entity.PromotionApplied;
import com.repo.OfferAppliedRepository;
import com.repo.PromotionAppliedRepository;

@Component
public class PromotionAppliedDaoImpl implements PromotionAppliedDao
{
	@Autowired
    private PromotionAppliedRepository promotionAppliedRepo;

    @Override
    public List<PromotionApplied> findAll() {
        return promotionAppliedRepo.findAll();
    }

    @Override
    public Optional<PromotionApplied> findById(Long id) {
        return promotionAppliedRepo.findById(id);
    }

    @Override
    public PromotionApplied save(PromotionApplied promotionApplied) {
        return promotionAppliedRepo.save(promotionApplied);
    }
}
