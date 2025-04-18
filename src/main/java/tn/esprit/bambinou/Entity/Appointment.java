package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idAppointment;
  //private List<User> ListUser;
  private String Location;
  private String Status;
  private String Description;
  private String AppointmentDateTime;

  private String transactionId;
  private String paymentStatus; // PENDING, COMPLETED, FAILED

  private String transcriptPdfPath;
  private boolean processingComplete;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "expert_id", nullable = false)
  private Expert expert;

  @ManyToOne
  @JoinColumn(name = "driver_id", nullable = true)
  private Driver driver;

  public Long getIdAppointment() {
    return idAppointment;
  }

  public void setIdAppointment(Long idAppointment) {
    this.idAppointment = idAppointment;
  }



  public String getLocation() {
    return Location;
  }

  public void setLocation(String location) {
    Location = location;
  }

  public String getStatus() {
    return Status;
  }

  public void setStatus(String status) {
    Status = status;
  }

  public String getDescription() {
    return Description;
  }

  public void setDescription(String description) {
    Description = description;
  }

  public String getAppointmentDateTime() {
    return AppointmentDateTime;
  }

  public void setAppointmentDateTime(String appointmentDateTime) {
    AppointmentDateTime = appointmentDateTime;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Expert getExpert() {
    return expert;
  }

  public void setExpert(Expert expert) {
    this.expert = expert;
  }

  public Driver getDriver() {
    return driver;
  }

  public void setDriver(Driver driver) {
    this.driver = driver;
  }

  public String getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(String transactionId) {
    this.transactionId = transactionId;
  }

  public String getPaymentStatus() {
    return paymentStatus;
  }

  public void setPaymentStatus(String paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  public String getTranscriptPdfPath() {
    return transcriptPdfPath;
  }

  public void setTranscriptPdfPath(String transcriptPdfPath) {
    this.transcriptPdfPath = transcriptPdfPath;
  }

  public boolean isProcessingComplete() {
    return processingComplete;
  }

  public void setProcessingComplete(boolean processingComplete) {
    this.processingComplete = processingComplete;
  }
}