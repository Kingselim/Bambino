package tn.esprit.bambinou.Controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Service.MeetingService;

import java.util.Map;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @PostMapping(value = "/process-recording", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> processRecording(
            @RequestParam("file") MultipartFile audioFile,
            @RequestParam("appointmentId") Long appointmentId) {
        try {
            String pdfPath = meetingService.processMeetingRecording(audioFile, appointmentId);
            return ResponseEntity.ok().body(Map.of("pdfUrl", pdfPath));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Processing failed: " + e.getMessage());
        }
    }
}