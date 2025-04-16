package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Service.IBabyService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/baby")
public class BabyController {

    @Autowired
    private IBabyService babyService;

    /*
        --------------------- format ajout d'un Baby avec JSON -----------------------

  {
    "idBaby": 2,
    "idUser": 1,
    "name": "Sarah",
    "favoriteActivities": "Playing, Drawing",
    "emergencyContact": "John Doe - 123456789",
    "medicalCondition": "None",
    "gender": "Female",
    "dateOfBirth": "2020-04-10",
    "specialNeeds": "None",
    "age": 5
}


     */

    // http://localhost:8089/baby/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Baby> getAllBabies() {
        return babyService.retrieveAllBabies();
    }

    // http://localhost:8089/baby/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Baby getBabyById(@PathVariable("id") Long id) {
        return babyService.retrieveBaby(id);
    }

    // http://localhost:8089/baby/add
    @PostMapping("/add")
    public Baby addBaby(@RequestBody Baby baby) {
        return babyService.addBaby(baby);
    }

    // http://localhost:8089/baby/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removeBaby(@PathVariable("id") Long id) {
        babyService.removeBaby(id);
    }

    // http://localhost:8089/baby/modify
    @PutMapping("/modify")
    public Baby modifyBaby(@RequestBody Baby baby) {
        return babyService.modifyBaby(baby);
    }

    // http://localhost:8089/baby/user/{idUser}
    @GetMapping("/user/{idUser}")
    public List<Baby> getBabiesByUser(@PathVariable("idUser") Long idUser) {
        return babyService.getBabiesByUser(idUser);
    }
}
