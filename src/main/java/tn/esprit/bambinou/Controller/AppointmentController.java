package tn.esprit.bambinou.Controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Service.IAppointmentService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private IAppointmentService appointmentService;

    @GetMapping("/retrieve-all-appointments")
    public List<Appointment> getAppointments() {
        return appointmentService.retrieveAllAppointments();
    }

    @GetMapping("/retrieve-appointment/{appointment-id}")
    public Appointment retrieveAppointment(@PathVariable("appointment-id") Long appointmentId) {
        return appointmentService.retrieveAppointment(appointmentId);
    }

    //http://localhost:8089/appointment/add-appointment
    @PostMapping("/add-appointment")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @DeleteMapping("/remove-appointment/{appointment-id}")
    public void removeAppointment(@PathVariable("appointment-id") Long appointmentId) {
        appointmentService.removeAppointment(appointmentId);
    }

    @PutMapping("/modify-appointment/{appointmentId}")
    public Appointment modifyAppointment(@RequestBody Appointment appointment, @PathVariable("appointmentId") Long appointmentId) {
        appointment.setIdAppointment(appointmentId); // Ensure the ID is set
        return appointmentService.modifyAppointment(appointment);
    }


}
