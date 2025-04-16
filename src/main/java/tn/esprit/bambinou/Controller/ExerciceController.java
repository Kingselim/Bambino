package tn.esprit.bambinou.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Exercice;
import tn.esprit.bambinou.Service.ExerciceServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/exercice")
@CrossOrigin(origins = "http://localhost:4200")
public class ExerciceController {

    private final ExerciceServiceImpl exerciceService;

    @Autowired
    public ExerciceController(ExerciceServiceImpl exerciceService) {
        this.exerciceService = exerciceService;
    }

    @GetMapping("/retrieve-all")
    public List<Exercice> getAllExercices() {
        return exerciceService.retrieveAllExercices();
    }

    @GetMapping("/retrieve/{id}")
    public ResponseEntity<Exercice> getExerciceById(@PathVariable("id") Long id) {
        Exercice exercice = exerciceService.retrieveExercice(id);
        return ResponseEntity.ok(exercice);
    }

    @PostMapping("/add")
    public ResponseEntity<Exercice> addExercice(@RequestBody Exercice exercice) {
        Exercice savedExercice = exerciceService.addExercice(exercice);
        return ResponseEntity.ok(savedExercice);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeExercice(@PathVariable("id") Long id) {
        exerciceService.removeExercice(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/modify/{id}")
    public ResponseEntity<Exercice> modifyExercice(@PathVariable("id") Long id, @RequestBody Exercice exercice) {
        exercice.setIdExercice(id); // ✅ fonctionne maintenant
        Exercice updated = exerciceService.modifyExercice(exercice);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<Exercice> like(@PathVariable Long id) {
        return ResponseEntity.ok(exerciceService.likeExercice(id));
    }

    @PutMapping("/{id}/dislike")
    public ResponseEntity<Exercice> dislike(@PathVariable Long id) {
        return ResponseEntity.ok(exerciceService.dislikeExercice(id));
    }





}
