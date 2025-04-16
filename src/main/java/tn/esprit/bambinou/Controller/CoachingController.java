package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Coaching;
import tn.esprit.bambinou.Service.ICoachingService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/coaching")

public class CoachingController {

    private final ICoachingService coachingService;
    public CoachingController(ICoachingService coachingService) {
        this.coachingService = coachingService;
    }
    // GET all coachings
    // http://localhost:8089/coaching/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Coaching> getAllCoachings() {
        return coachingService.retrieveAllCoachings();
    }

    // GET a coaching by ID
    // http://localhost:8089/coaching/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public ResponseEntity<Coaching> getCoachingById(@PathVariable("id") Long id) {
        Coaching coaching = coachingService.retrieveCoaching(id);
        if (coaching != null) {
            return ResponseEntity.ok(coaching);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST create new coaching
    // http://localhost:8089/coaching/coachings
    @PostMapping("/add")
    public ResponseEntity<Coaching> addCoaching(@RequestBody Coaching coaching) {
        Coaching savedCoaching = coachingService.addCoaching(coaching);
        return ResponseEntity.ok(savedCoaching);
    }

    // DELETE coaching
    // http://localhost:8089/coaching/remove/{id}
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeCoaching(@PathVariable("id") Long id) {
        coachingService.removeCoaching(id);
        return ResponseEntity.noContent().build();
    }

    // PUT update coaching
    // http://localhost:8089/coaching/modify/{id}
    @PutMapping("/modify/{id}")
    public ResponseEntity<Coaching> modifyCoaching(@PathVariable("id") Long id, @RequestBody Coaching coaching) {
        coaching.setIdCoaching(id); // Force l’ID depuis l’URL
        Coaching updated = coachingService.modifyCoaching(coaching);
        return ResponseEntity.ok(updated);
    }


    // Optionnel : GET coachings par utilisateur
    /*
    @GetMapping("/user/{idUser}")
    public List<Coaching> getCoachingsByUser(@PathVariable("idUser") Long idUser) {
        return coachingService.getCoachingsByUser(idUser);
    }
    */
}
