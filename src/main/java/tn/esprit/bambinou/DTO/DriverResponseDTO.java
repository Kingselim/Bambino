package tn.esprit.bambinou.DTO;

import java.util.List;

public class DriverResponseDTO {
    private int idDriver;
    private String nameDriver;
    private Long phoneNumber;
    private String carModel;
    private String licensePlate;
    private List<AppointmentResponseDTO> driverAppointments;

    public int getIdDriver() {
        return idDriver;
    }

    public void setIdDriver(int idDriver) {
        this.idDriver = idDriver;
    }

    public String getNameDriver() {
        return nameDriver;
    }

    public void setNameDriver(String nameDriver) {
        this.nameDriver = nameDriver;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public List<AppointmentResponseDTO> getDriverAppointments() {
        return driverAppointments;
    }

    public void setDriverAppointments(List<AppointmentResponseDTO> driverAppointments) {
        this.driverAppointments = driverAppointments;
    }
}
