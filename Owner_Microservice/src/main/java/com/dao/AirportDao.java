
package com.dao;

import com.entity.Airport;
import java.util.List;
import java.util.Optional;

public interface AirportDao {
    List<Airport> findAll();
    Optional<Airport> findById(Long id);
    Airport save(Airport airport);
    void deleteByUniqueCode(String code);
}
