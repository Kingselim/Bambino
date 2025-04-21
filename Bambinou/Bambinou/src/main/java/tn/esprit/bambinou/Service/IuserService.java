package tn.esprit.bambinou.Service;


import tn.esprit.bambinou.Entity.User;

import java.util.List;

public interface IuserService {
    public List<User> retrieveAllUsers();
    public User retrieveUser(Long userId);
    public User addUser(User user);
    public void removeUser(Long userId);
    public User modifyUser(User user);
}
