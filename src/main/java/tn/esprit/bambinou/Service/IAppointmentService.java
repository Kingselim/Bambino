package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Appointment;

import java.util.List;

public interface IAppointmentService {
  List<Appointment> getAllAppointments();
  Appointment getAppointmentById(long id);
  Appointment createAppointment(Appointment appointment);


  Appointment updateAppointment(long id, Appointment appointment);
  void deleteAppointment(long id);
}