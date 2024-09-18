
package com.dao;

import com.entity.Schedule;
import java.util.List;
import java.util.Optional;

public interface ScheduleDao {
    List<Schedule> findAll();
    Optional<Schedule> findById(Long id);
    Schedule save(Schedule schedule);
    void deleteById(Long id);
}
