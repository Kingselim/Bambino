package tn.esprit.bambinou.DTO;

public class AppointmentResponseDTO {
    private Long idAppointment;
    private String location;
    private String status;
    private String description;
    private String appointmentDateTime;
    private UserDTO user;
    private ExpertDTO expert;
    private DriverDTO driver;
    public AppointmentResponseDTO() {}

    public Long getIdAppointment() {
        return idAppointment;
    }

    public void setIdAppointment(Long idAppointment) {
        this.idAppointment = idAppointment;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(String appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ExpertDTO getExpert() {
        return expert;
    }

    public void setExpert(ExpertDTO expert) {
        this.expert = expert;
    }

    public DriverDTO getDriver() {
        return driver;
    }

    public void setDriver(DriverDTO driver) {
        this.driver = driver;
    }
}
