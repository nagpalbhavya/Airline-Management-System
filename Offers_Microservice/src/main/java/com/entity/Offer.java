package com.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

import java.util.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offerId;

    @Column(unique = true)
    private String offerCode;
    private String description;
    @Column(nullable = false)
    private double discountPercentage;
    @Column(nullable = false)
    private LocalDateTime validFrom;
    @Column(nullable = false)
    private LocalDateTime validUntil;
    @Column(nullable = false)
    private int isActive;
    
    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL)
    private List<OfferApplied> offerAppliedList;
}
