package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Promotion;

public interface PromotionRepo extends JpaRepository<Promotion,Long>
{

}
