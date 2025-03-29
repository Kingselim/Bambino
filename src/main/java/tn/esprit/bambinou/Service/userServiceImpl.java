package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.DTO.*;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class userServiceImpl implements IuserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User retrieveUser(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void removeUser(int userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User modifyUser(User user) {
        return userRepository.save(user);
    }


    //---------------------modifcation by drira (related to ClientAppointment table in user entity)----------------
    @Override
    public List<UserResponseDTO> retrieveAllUsers_2() {
        return userRepository.findAll().stream().map(this::convertToUserResponseDTO).collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO retrieveUserByID_2(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return convertToUserResponseDTO(user);
    }

    @Override
    public UserResponseDTO modifyUser_2(int userId, UserDTO userDTO) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(userDTO.getName());
        existingUser.setAge(userDTO.getAge());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPassword(userDTO.getPassword());

        User updatedUser = userRepository.save(existingUser);
        return convertToUserResponseDTO(updatedUser);
    }

    private UserResponseDTO convertToUserResponseDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(user.getId());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setAge(user.getAge());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setPassword(user.getPassword());

        Set<AppointmentResponseDTO> appointmentDTOs = user.getClientAppointments().stream().map(appointment -> {
            AppointmentResponseDTO appointmentResponseDTO = new AppointmentResponseDTO();

            appointmentResponseDTO.setIdAppointment(appointment.getIdAppointment());
            appointmentResponseDTO.setLocation(appointment.getLocation());
            appointmentResponseDTO.setStatus(appointment.getStatus());
            appointmentResponseDTO.setDescription(appointment.getDescription());
            appointmentResponseDTO.setAppointmentDateTime(appointment.getAppointmentDateTime());

            UserDTO userDTO = new UserDTO();
            userDTO.setId(appointment.getUser().getId());
            appointmentResponseDTO.setUser(userDTO);

            ExpertDTO expertDTO = new ExpertDTO();
            expertDTO.setId(appointment.getExpert().getId());
            appointmentResponseDTO.setExpert(expertDTO);

            if (appointment.getDriver() != null) {
                DriverDTO driverDTO = new DriverDTO();
                driverDTO.setIdDriver(appointment.getDriver().getIdDriver());
                appointmentResponseDTO.setDriver(driverDTO);
            }

            return appointmentResponseDTO;
        }).collect(Collectors.toSet());

        userResponseDTO.setClientAppointments(appointmentDTOs);

        return userResponseDTO;
    }









}
