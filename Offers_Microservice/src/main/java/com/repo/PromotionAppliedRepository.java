package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Offer;
import com.entity.PromotionApplied;

@Repository
public interface PromotionAppliedRepository extends JpaRepository<PromotionApplied, Long>
{
	
}
