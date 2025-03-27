package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
}
