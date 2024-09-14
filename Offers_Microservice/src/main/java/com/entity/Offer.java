package com.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

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
//    @OneToOne(cascade = CascadeType.ALL)
    private Long offerId;

    @Column(nullable = false, unique = true)
    private String offerCode;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double discountPercentage;

    @Column(nullable = false)
    private LocalDateTime validFrom;

    @Column(nullable = false)
    private LocalDateTime validUntil;

    @Column(nullable = false)
    private boolean isActive;
    
//    @OneToOne(cascade = CascadeType.ALL)
//    private Set<OfferApplied> offerAppliedSet;
}
