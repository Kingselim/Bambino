package tn.esprit.bambinou.DTO;

import java.util.List;

public class ExpertResponseDTO {
    private int id;
    private String name;
    private String age;
    private String email;
    private String specialty;

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
}
