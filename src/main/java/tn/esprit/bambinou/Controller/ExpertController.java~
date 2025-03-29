package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Expert;
import tn.esprit.bambinou.Service.IExpertService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/expert")
public class ExpertController {

    @Autowired
    private IExpertService expertService;

    @GetMapping("/retrieve-all-experts")
    public List<Expert> getAllExperts() {
        return expertService.getAllExperts();
    }

    @GetMapping("/retrieve-expert/{id}")
    public ResponseEntity<Expert> getExpertById(@PathVariable int id) {
        return ResponseEntity.ok(expertService.getExpertById(id));
    }

    @PostMapping("/add-expert")
    public ResponseEntity<Expert> createExpert(@RequestBody Expert expert) {
        return ResponseEntity.ok(expertService.createExpert(expert));
    }

    @PutMapping("/modify-expert/{id}")
    public ResponseEntity<Expert> updateExpert(@PathVariable int id, @RequestBody Expert expert) {
        return ResponseEntity.ok(expertService.updateExpert(id, expert));
    }

    @DeleteMapping("/remove-expert/{id}")
    public ResponseEntity<Void> deleteExpert(@PathVariable int id) {
        expertService.deleteExpert(id);
        return ResponseEntity.noContent().build();
    }
}
