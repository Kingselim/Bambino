package tn.esprit.bambinou.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDriver;
    private String NameDriver;
    private Long phoneNumber;
    private String CarModel;
    private String LicensePlate;

    public Long getIdDriver() {
        return idDriver;
    }

    public void setIdDriver(Long idDriver) {
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
}
