package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDriver;
    private String NameDriver;
    private Long phoneNumber;
    private String CarModel;
    private String LicensePlate;

    @Getter
    @OneToMany(mappedBy = "driver", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Appointment> driverAppointments = new HashSet<>();


    public int getId() {
        return idDriver;
    }

    public void setId(int idDriver) {
        this.idDriver = idDriver;
    }



    public String getNameDriver() {
        return NameDriver;
    }

    public void setNameDriver(String nameDriver) {
        NameDriver = nameDriver;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCarModel() {
        return CarModel;
    }

    public void setCarModel(String carModel) {
        CarModel = carModel;
    }

    public String getLicensePlate() {
        return LicensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        LicensePlate = licensePlate;
    }

    public Set<Appointment> getDriverAppointments() {
        return driverAppointments;
    }

    public void setDriverAppointments(Set<Appointment> driverAppointments) {
        this.driverAppointments = driverAppointments;
    }
}
