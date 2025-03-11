package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.UserRepository;

import java.util.List;

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
    public User retrieveUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User modifyUser(User user) {
        return userRepository.save(user);
    }
}
