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
    private String firstName;
    private String lastName;
    private LocalDateTime dob;
    private String travelClass;
    private int baggageAllowance;
}
