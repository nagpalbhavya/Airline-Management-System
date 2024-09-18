package com.entity;



import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "offers_applied")
public class OfferApplied {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appliedId;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;

    private Long bookingId;
}

