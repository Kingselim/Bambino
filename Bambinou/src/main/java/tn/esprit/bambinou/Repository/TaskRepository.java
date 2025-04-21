package tn.esprit.bambinou.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Task;
import tn.esprit.bambinou.Entity.Task;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByIdPregnancyTracking(Long id);
    boolean existsByDateAndTimeAndStatusAndIdPregnancyTracking(LocalDate date, LocalTime time, String status, Long idPregnancyTracking);

}