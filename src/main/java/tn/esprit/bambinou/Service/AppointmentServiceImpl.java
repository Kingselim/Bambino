package tn.esprit.bambinou.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Entity.Driver;
import tn.esprit.bambinou.Entity.Expert;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.AppointmentRepository;
import tn.esprit.bambinou.Repository.DriverRepository;
import tn.esprit.bambinou.Repository.ExpertRepository;
import tn.esprit.bambinou.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ExpertRepository expertRepository;

  @Autowired
  private DriverRepository driverRepository;

  private static final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

  @Override
  public List<Appointment> getAllAppointments() {
    return appointmentRepository.findAll();
  }

  @Override
  public Appointment getAppointmentById(long id) {
    return appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
  }

  @Override
  public Appointment createAppointment(Appointment appointment) {
    log.info("Creating appointment for user ID: {}, expert ID: {}, driver ID: {}",
            appointment.getUser().getId(), appointment.getExpert().getId(),
            appointment.getDriver() != null ? appointment.getDriver().getId() : "No driver");

    // Validate and fetch User
    User user = userRepository.findById(appointment.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Validate and fetch Expert
    Expert expert = expertRepository.findById(appointment.getExpert().getId())
            .orElseThrow(() -> new RuntimeException("Expert not found"));

    // Validate and fetch Driver (if exists)
    if (appointment.getDriver() != null) {
      Driver driver = driverRepository.findById(appointment.getDriver().getId())
              .orElseThrow(() -> new RuntimeException("Driver not found"));
      appointment.setDriver(driver);
    }

    // Set the Appointment for the user and expert
    appointment.setUser(user);
    appointment.setExpert(expert);

    // Add only Appointment IDs to the sets
    /*user.getClientAppointments().add(appointment);
    expert.getExpertAppointments().add(appointment);
    if (appointment.getDriver() != null) {
      appointment.getDriver().getDriverAppointments().add(appointment);
    }*/

    // Save and return the appointment
    Appointment savedAppointment = appointmentRepository.save(appointment);
    log.info("Appointment created successfully with ID: {}", savedAppointment.getIdAppointment());
    return savedAppointment;
  }

  @Override
  public Appointment updateAppointment(long id, Appointment appointment) {
    Appointment existingAppointment = getAppointmentById(id);
    existingAppointment.setLocation(appointment.getLocation());
    existingAppointment.setStatus(appointment.getStatus());
    existingAppointment.setDescription(appointment.getDescription());
    existingAppointment.setDriver(appointment.getDriver());
    existingAppointment.setAppointmentDateTime(appointment.getAppointmentDateTime());

    return appointmentRepository.save(existingAppointment);
  }

  @Override
  public void deleteAppointment(long id) {
    appointmentRepository.deleteById(id);
  }
}
