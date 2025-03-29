package tn.esprit.bambinou.DTO;

public class AppointmentDTO {
    private String location;
    private String status;
    private String description;
    private String appointmentDateTime;
    private Integer userId;
    private Integer expertId;
    private Integer driverId; // Nullable if not required

    // Constructors
    public AppointmentDTO() {}

    public AppointmentDTO(String location, String status, String description,
                          String appointmentDateTime, int userId, int expertId, int driverId) {
        this.location = location;
        this.status = status;
        this.description = description;
        this.appointmentDateTime = appointmentDateTime;
        this.userId = userId;
        this.expertId = expertId;
        this.driverId = driverId;
    }

    // Getters and setters


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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getExpertId() {
        return expertId;
    }

    public void setExpertId(int expertId) {
        this.expertId = expertId;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }
}
