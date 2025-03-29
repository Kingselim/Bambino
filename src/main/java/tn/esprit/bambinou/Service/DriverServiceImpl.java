package tn.esprit.bambinou.Service;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.DTO.*;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Entity.Driver;
import tn.esprit.bambinou.Repository.DriverRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class DriverServiceImpl implements IDriverService {
    @Autowired
    private DriverRepository driverRepository;

    /*@Override
    public List<Driver> retrieveAllDrivers() {
        return driverRepository.findAll();
    }

    @Override
    public Driver retrieveDriver(int driverId) {
        return driverRepository.findById(driverId).orElse(null);
    }*/

    @Override
    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public void removeDriver(int driverId) {
        driverRepository.deleteById(driverId);
    }

    /*@Override
    public Driver modifyDriver(Driver driver) {
        return driverRepository.save(driver);
    }*/


    // Helper: Convert Appointment to AppointmentResponseDTO
    private AppointmentResponseDTO convertToAppointmentResponseDTO(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setIdAppointment(appointment.getIdAppointment());
        dto.setLocation(appointment.getLocation());
        dto.setStatus(appointment.getStatus());
        dto.setDescription(appointment.getDescription());
        dto.setAppointmentDateTime(appointment.getAppointmentDateTime());

        // Set User info
        if (appointment.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(appointment.getUser().getId());
            dto.setUser(userDTO);
        }

        // Set Expert info
        if (appointment.getExpert() != null) {
            ExpertDTO expertDTO = new ExpertDTO();
            expertDTO.setId(appointment.getExpert().getId());
            dto.setExpert(expertDTO);
        }

        // Set Driver info
        if (appointment.getDriver() != null) {
            DriverDTO driverDTO = new DriverDTO();
            driverDTO.setIdDriver(appointment.getDriver().getId());
            dto.setDriver(driverDTO);
        }

        return dto;
    }

    // Helper: Convert Driver to DriverResponseDTO
    private DriverResponseDTO convertToDriverResponseDTO(Driver driver) {
        DriverResponseDTO dto = new DriverResponseDTO();
        dto.setIdDriver(driver.getIdDriver());
        dto.setNameDriver(driver.getNameDriver());
        dto.setPhoneNumber(driver.getPhoneNumber());
        dto.setCarModel(driver.getCarModel());
        dto.setLicensePlate(driver.getLicensePlate());

        // Map appointments to AppointmentResponseDTO
        List<AppointmentResponseDTO> appointmentDTOs = driver.getDriverAppointments()
                .stream()
                .map(this::convertToAppointmentResponseDTO)
                .toList();

        dto.setDriverAppointments(appointmentDTOs);
        return dto;
    }

    @Override
    public List<DriverResponseDTO> retrieveAllDrivers() {
        return driverRepository.findAll().stream()
                .map(this::convertToDriverResponseDTO)
                .toList();
    }

    @Override
    public DriverResponseDTO retrieveDriver(int driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + driverId));
        return convertToDriverResponseDTO(driver);
    }

    @Override
    public DriverResponseDTO modifyDriver(int driverId, DriverDTO driverDTO) {
        Driver existingDriver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + driverId));

        if (driverDTO.getNameDriver() != null) existingDriver.setNameDriver(driverDTO.getNameDriver());
        if (driverDTO.getPhoneNumber() != null) existingDriver.setPhoneNumber(driverDTO.getPhoneNumber());
        if (driverDTO.getCarModel() != null) existingDriver.setCarModel(driverDTO.getCarModel());
        if (driverDTO.getLicensePlate() != null) existingDriver.setLicensePlate(driverDTO.getLicensePlate());

        Driver updatedDriver = driverRepository.save(existingDriver);
        return convertToDriverResponseDTO(updatedDriver);
    }

}