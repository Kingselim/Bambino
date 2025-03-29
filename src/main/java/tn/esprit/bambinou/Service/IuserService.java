package tn.esprit.bambinou.Service;


import tn.esprit.bambinou.DTO.UserDTO;
import tn.esprit.bambinou.DTO.UserResponseDTO;
import tn.esprit.bambinou.Entity.User;

import java.util.List;

public interface IuserService {
    public List<User> retrieveAllUsers();
    public User retrieveUser(int userId);
    public User addUser(User user);
    public void removeUser(int userId);
    public User modifyUser(User user);


    List<UserResponseDTO> retrieveAllUsers_2();
    UserResponseDTO retrieveUserByID_2(int userId);
    UserResponseDTO modifyUser_2(int userId, UserDTO userDTO);
}
