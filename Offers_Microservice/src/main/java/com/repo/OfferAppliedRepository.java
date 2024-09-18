package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.OfferApplied;

@Repository
public interface OfferAppliedRepository extends JpaRepository<OfferApplied, Long> {
}
