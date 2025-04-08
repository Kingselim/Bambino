package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.PregnancyTracking;
import tn.esprit.bambinou.Service.IPregnancyTrackingService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/pregnancy-tracking")
public class PregnancyTrackingController {

    @Autowired
    private IPregnancyTrackingService pregnancyTrackingService;

    // http://localhost:8089/pregnancy-tracking/retrieve-all
    @GetMapping("/retrieve-all")
    public List<PregnancyTracking> getAllPregnancyTrackings() {
        return pregnancyTrackingService.retrieveAllPregnancyTrackings();
    }

    // http://localhost:8089/pregnancy-tracking/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public PregnancyTracking getPregnancyTracking(@PathVariable("id") Long id) {
        return pregnancyTrackingService.retrievePregnancyTracking(id);
    }

    // http://localhost:8089/pregnancy-tracking/add
    @PostMapping("/add")
    public PregnancyTracking addPregnancyTracking(@RequestBody PregnancyTracking p) {
        return pregnancyTrackingService.addPregnancyTracking(p);
    }

    // http://localhost:8089/pregnancy-tracking/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removePregnancyTracking(@PathVariable("id") Long id) {
        pregnancyTrackingService.removePregnancyTracking(id);
    }

    // http://localhost:8089/pregnancy-tracking/modify/{id}
    @PutMapping("/modify/{id}")
    public ResponseEntity<PregnancyTracking> modifyPregnancyTracking(@PathVariable("id") Long id, @RequestBody PregnancyTracking p) {
        p.setIdPregnancyTracking(id); // S'assurer que l'ID de l'entité correspond à celui de l'URL
        PregnancyTracking updatedPregnancyTracking = pregnancyTrackingService.modifyPregnancyTracking(p);
        return ResponseEntity.ok(updatedPregnancyTracking);
    }

/*{
  "datePregnancyTracking": "2025-03-15",
  "namePregnancyTracking": "InitialCheckup",
  "intervalChoice": "MONTH"
}

 */

}
