package tn.esprit.bambinou.DTO;

public class DriverDTO {
    private int idDriver;
    private String NameDriver;
    private Long phoneNumber;
    private String CarModel;
    private String LicensePlate;

    public int getIdDriver() {
        return idDriver;
    }

    public void setIdDriver(int idDriver) {
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
