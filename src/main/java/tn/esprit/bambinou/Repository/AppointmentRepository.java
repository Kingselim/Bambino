package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByExpertId(int expertId);
}
