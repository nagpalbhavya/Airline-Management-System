package com.entity;



import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "offers_applied")
public class OfferApplied {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appliedId;

    @OneToOne
    @JoinColumn(name = "offerId", nullable = false)
    private Offer offer;

    @Column(name = "booking_id")
    private Long bookingId;
}

