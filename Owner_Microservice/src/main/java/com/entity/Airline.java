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
@jakarta.persistence.Table(name = "airlines")
public class Airline {

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long airlineId;
    private String airlineName;
    private String airlineImage;
    private String airlinePassword;
    private String airlineUniqueCode;
}
