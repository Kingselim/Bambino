package tn.esprit.bambinou.DTO;

import java.util.List;

public class ExpertResponseDTO {
    private int id;
    private String name;
    private String age;
    private String email;
    private String specialty;

    private String location;
    private float rating;
    private boolean rated;

    private Double latitude;
    private Double longitude;
    private int appointmentPrice;


    private List<AppointmentResponseDTO> expertAppointments;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public List<AppointmentResponseDTO> getExpertAppointments() {
        return expertAppointments;
    }

    public void setExpertAppointments(List<AppointmentResponseDTO> expertAppointments) {
        this.expertAppointments = expertAppointments;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public boolean isRated() {
        return rated;
    }

    public void setRated(boolean rated) {
        this.rated = rated;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public int getAppointmentPrice() {
        return appointmentPrice;
    }

    public void setAppointmentPrice(int appointmentPrice) {
        this.appointmentPrice = appointmentPrice;
    }
}
