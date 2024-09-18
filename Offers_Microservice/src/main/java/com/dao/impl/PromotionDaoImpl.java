package com.dao.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.PromotionDao;
import com.entity.Offer;
import com.entity.Promotion;
import com.repo.OfferRepository;
import com.repo.PromotionRepo;

@Component
public class PromotionDaoImpl implements PromotionDao
{
	@Autowired
    private PromotionRepo promotionRepo;

	@Override
	public List<Promotion> findAll() 
	{
		return promotionRepo.findAll();
	}

	@Override
	public Optional<Promotion> findById(Long id) 
	{
        return promotionRepo.findById(id);

	}

	@Override
	public Promotion save(Promotion promotion) 
	{
		return promotionRepo.save(promotion);
	}

	@Override
	public void deleteById(Long id) 
	{
		promotionRepo.deleteById(id);
	}

    
}
