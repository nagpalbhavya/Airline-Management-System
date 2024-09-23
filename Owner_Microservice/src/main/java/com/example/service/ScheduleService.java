package com.example.service;

import com.entity.Schedule;
import com.example.dao.ScheduleDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleDao scheduleDao;

    public List<Schedule> getAllSchedules() {
        return scheduleDao.findAll();
    }

    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleDao.findById(id);
    }

    public Schedule saveSchedule(Schedule schedule) {
        return scheduleDao.save(schedule);
    }

    public void deleteSchedule(Long id) {
        scheduleDao.deleteById(id);
    }
}
