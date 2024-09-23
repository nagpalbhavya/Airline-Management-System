package com.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;



@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "airports")
public class Airport {

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long airportId;

    private String uniqueCode;
    private String airportName;
    private String city;
}
