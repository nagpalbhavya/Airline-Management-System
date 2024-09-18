package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Promotion;
import com.service.PromotionService;

@RestController
@RequestMapping("/promotions")
public class PromotionController 
{
	@Autowired
    private PromotionService promotionService;

    @GetMapping("/list")
    public List<Promotion> getAllPromotions() {
        return promotionService.getAllPromotions();
    }

    @GetMapping("/getpromotionbyid/{id}")
    public Optional<Promotion> getPromotionById(@PathVariable Long id) {
        return promotionService.getPromotionById(id);
    }

    @PostMapping("/createpromotion")
    public Promotion createOffer(@RequestBody Promotion promotion) {
        return promotionService.savePromotion(promotion);
    }

    @PutMapping("/updatepromotion/{id}")
    public Promotion updatePromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        promotion.setPromotionId(id);
        return promotionService.savePromotion(promotion);
    }

    @DeleteMapping("/deletepromotion/{id}")
    public void deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
    }
    
    @PutMapping("/updatePromotionListing/{PromotionId}/{status}")
    public void updateOfferListing(@PathVariable Long promotionId, @PathVariable int status)
    {
    	Optional<Promotion> promotion=promotionService.getPromotionById(promotionId);
    	if(promotion.isPresent())
    	{
    		Promotion p=promotion.get();
    		p.setIsActive(status);
    		promotionService.savePromotion(p);
    	}
    	
    }
}
