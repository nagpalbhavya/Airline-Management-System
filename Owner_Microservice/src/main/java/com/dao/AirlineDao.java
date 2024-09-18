package com.dao;




import com.entity.Airline;
import java.util.List;
import java.util.Optional;

public interface AirlineDao {
    List<Airline> findAll();
    Optional<Airline> findById(Long id);
    Airline save(Airline airline);
    void deleteById(Long id);
}
