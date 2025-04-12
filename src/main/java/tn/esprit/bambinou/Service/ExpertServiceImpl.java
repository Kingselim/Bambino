package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.DTO.*;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Entity.Expert;
import tn.esprit.bambinou.Repository.ExpertRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpertServiceImpl implements IExpertService {

    @Autowired
    private ExpertRepository expertRepository;

    /*@Override
    public List<Expert> getAllExperts() {
        return expertRepository.findAll();
    }

    @Override
    public Expert getExpertById(int id) {
        return expertRepository.findById(id).orElseThrow(() -> new RuntimeException("Expert not found"));
    }*/

    @Override
    public Expert createExpert(Expert expert) {
        return expertRepository.save(expert);
    }

    /*@Override
    public Expert updateExpert(int id, Expert expert) {
        Expert existingExpert = getExpertById(id);
        existingExpert.setName(expert.getName());
        existingExpert.setAge(expert.getAge());
        existingExpert.setEmail(expert.getEmail());
        existingExpert.setPassword(expert.getPassword());
        existingExpert.setSpecialty(expert.getSpecialty());
        return expertRepository.save(existingExpert);
    }*/

    @Override
    public void deleteExpert(int id) {
        expertRepository.deleteById(id);
    }




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

        // Set Driver info (if present)
        if (appointment.getDriver() != null) {
            DriverDTO driverDTO = new DriverDTO();
            driverDTO.setIdDriver(appointment.getDriver().getId());
            dto.setDriver(driverDTO);
        }

        return dto;
    }

    // Helper: Convert Expert to ExpertResponseDTO
    private ExpertResponseDTO convertToResponseDTO(Expert expert) {
        ExpertResponseDTO dto = new ExpertResponseDTO();
        dto.setId(expert.getId());
        dto.setName(expert.getName());
        dto.setAge(expert.getAge());
        dto.setEmail(expert.getEmail());
        dto.setSpecialty(expert.getSpecialty());

        dto.setLocation(expert.getLocation());
        dto.setRating(expert.getRating());
        dto.setRated(expert.isRated());


        // Map expertAppointments to AppointmentResponseDTO
        List<AppointmentResponseDTO> appointmentDTOs = expert.getExpertAppointments()
                .stream()
                .map(this::convertToAppointmentResponseDTO)
                .toList();

        dto.setExpertAppointments(appointmentDTOs);
        return dto;
    }

    @Override
    public List<ExpertResponseDTO> getAllExperts() {
        List<Expert> experts = expertRepository.findAll();
        return experts.stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    @Override
    public ExpertResponseDTO getExpertById(int id) {
        Expert expert = expertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expert not found with ID: " + id));
        return convertToResponseDTO(expert);
    }

    @Override
    public ExpertResponseDTO updateExpert(int id, ExpertDTO expertDTO) {
        Expert existingExpert = expertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expert not found with ID: " + id));

        // Update fields if not null
        if (expertDTO.getName() != null) existingExpert.setName(expertDTO.getName());
        if (expertDTO.getAge() != null) existingExpert.setAge(expertDTO.getAge());
        if (expertDTO.getEmail() != null) existingExpert.setEmail(expertDTO.getEmail());
        if (expertDTO.getPassword() != null) existingExpert.setPassword(expertDTO.getPassword());
        if (expertDTO.getSpecialty() != null) existingExpert.setSpecialty(expertDTO.getSpecialty());

        if (expertDTO.getLocation() != null) existingExpert.setLocation(expertDTO.getLocation());
        existingExpert.setRating(expertDTO.getRating());  // Be sure to design how to treat default cases.
        existingExpert.setRated(expertDTO.isRated());


        Expert updatedExpert = expertRepository.save(existingExpert);
        return convertToResponseDTO(updatedExpert);
    }
}
