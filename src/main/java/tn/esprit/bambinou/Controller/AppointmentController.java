package tn.esprit.bambinou.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.DTO.AppointmentDTO;
import tn.esprit.bambinou.DTO.AppointmentResponseDTO;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Service.IAppointmentService;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

  @Autowired
  private IAppointmentService appointmentService;


  // Get all appointments
  @GetMapping("/retrieve-all-appointments")
  public List<Appointment> getAllAppointments() {
    return appointmentService.getAllAppointments();
  }

  // Get appointment by ID
  @GetMapping("retrieve-appointment/{id}")
  public Appointment getAppointmentById(@PathVariable("id") int id) {
    return appointmentService.getAppointmentById(id);
  }

  // Create new appointment
  @PostMapping("/add-appointment")
  @ResponseStatus(HttpStatus.CREATED)
  public Appointment createAppointment(@RequestBody Appointment appointment) {
    return appointmentService.createAppointment(appointment);
  }

  // Update an appointment
  @PutMapping("/modify-appointment/{id}")
  public Appointment updateAppointment(@PathVariable("id") int id, @RequestBody Appointment appointment) {
    return appointmentService.updateAppointment(id, appointment);
  }

  // Delete an appointment
  @DeleteMapping("/delete/{id}")
  public void deleteAppointment(@PathVariable("id") int id) {
    appointmentService.deleteAppointment(id);
  }


  @PostMapping("/create")
  public ResponseEntity<AppointmentResponseDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
    return appointmentService.createApp(appointmentDTO);
  }

}
