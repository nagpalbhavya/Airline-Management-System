package com.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Promotion 
{
    @Id
    @GeneratedValue
    private Long promotionId;
    private String airlineName;
    private String offerCode;
    private String description;
    private double discountPercentage;
    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    private int isActive;
    

    @OneToMany(mappedBy = "promotion", cascade = CascadeType.ALL)
    private List<PromotionApplied> promotionApplied;
}
