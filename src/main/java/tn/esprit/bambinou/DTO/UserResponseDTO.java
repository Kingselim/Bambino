package tn.esprit.bambinou.DTO;

import java.util.Set;

public class UserResponseDTO {
    private int id;
    private String name;
    private String age;
    private String email;
    private String password;
    private Set<AppointmentResponseDTO> clientAppointments;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<AppointmentResponseDTO> getClientAppointments() {
        return clientAppointments;
    }

    public void setClientAppointments(Set<AppointmentResponseDTO> clientAppointments) {
        this.clientAppointments = clientAppointments;
    }
}