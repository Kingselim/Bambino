package tn.esprit.bambinou.Controller;


import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Service.IuserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IuserService userService;
    /*
        --------------------- format ajout d un User avec JSON -----------------------

    {
        "id": 1,             nb: retirer l'id lors de l'ajout
        "name": "yacine",
        "age": "23",
        "email": "yacine@gmail.com",
        "password": "yacineee",
        "roleTypes": [
            {
                "id": 1,              nb: mettre l'id du role souhaite
                "role": "ADMIN"
            }
        ]
    }

     */


    // http://localhost:8089/user/retrieve-all-users
    @GetMapping("/retrieve-all-users")
    public List<User> getUsers() {
        return userService.retrieveAllUsers();
    }

    // http://localhost:8089/user/retrieve-user/{user-id}
    @GetMapping("/retrieve-user/{user-id}")
    public User retrieveUser(@PathVariable("user-id") Long userId) {
        return userService.retrieveUser(userId);
    }

    // http://localhost:8089/user/add-user
    @PostMapping("/add-user")
    public User addUser(@RequestBody User u) {
        return userService.addUser(u);
    }

    @DeleteMapping("/remove-user/{user-id}")
    public void removeUser(@PathVariable("user-id") Long userId) {
        userService.removeUser(userId);
    }

    @PutMapping("/modify-user")
    public User modifyUser(@RequestBody User u) {
        return userService.modifyUser(u);
    }
}
