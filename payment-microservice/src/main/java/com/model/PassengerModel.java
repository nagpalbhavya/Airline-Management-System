package com.model;
import java.time.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassengerModel 
{
    private String name;
    private String email;
    private String travelClass;
    private int baggageAllowance;
}
