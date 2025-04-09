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
import java.util.Map;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

  @Autowired
  private IAppointmentService appointmentService;


  // Get all appointments
  /*@GetMapping("/retrieve-all-appointments")
  public List<Appointment> getAllAppointments() {
    return appointmentService.getAllAppointments();
  }*/

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



  // Retrieve all appointments
  @GetMapping("/get-all")
  public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments() {
    return appointmentService.getAllAppointments();
  }

  // Retrieve appointment by id
  @GetMapping("/get-one/{id}")
  public ResponseEntity<AppointmentResponseDTO> getAppointmentById(@PathVariable Long id) {
    return appointmentService.getAppointmentById(id);
  }

  // Modify appointment
  @PutMapping("/modify/{id}")
  public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
    return appointmentService.updateAppointment(id, appointmentDTO);
  }

  @PutMapping("/cancel/{id}")
  public ResponseEntity<AppointmentResponseDTO> cancelAppointment(@PathVariable Long id) {
    return appointmentService.cancelAppointment(id);
  }

  @GetMapping("/expert-statistics/{expertId}")
  public ResponseEntity<Map<String, Object>> getExpertStatistics(@PathVariable int expertId) {
    return ResponseEntity.ok(appointmentService.getExpertStatistics(expertId));
  }


}
