package tn.esprit.bambinou.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import tn.esprit.bambinou.DTO.AppointmentDTO;
import tn.esprit.bambinou.DTO.AppointmentResponseDTO;
import tn.esprit.bambinou.Entity.Appointment;

import java.util.List;

public interface IAppointmentService {
  //List<Appointment> getAllAppointments();
  Appointment getAppointmentById(long id);
  Appointment createAppointment(Appointment appointment);


  Appointment updateAppointment(long id, Appointment appointment);

  public ResponseEntity<AppointmentResponseDTO> createApp(@RequestBody AppointmentDTO appointmentDTO);
  void deleteAppointment(long id);

  // Retrieve all appointments
  public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments();

  // Retrieve appointment by ID
  public ResponseEntity<AppointmentResponseDTO> getAppointmentById(Long id);

  // Modify appointment (update)
  public ResponseEntity<AppointmentResponseDTO> updateAppointment(Long id, @RequestBody AppointmentDTO appointmentDTO);
}
