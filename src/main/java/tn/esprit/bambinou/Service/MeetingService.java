package tn.esprit.bambinou.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Repository.AppointmentRepository;

@Service
public class MeetingService {

    private final AppointmentRepository appointmentRepository;
    private final WhisperService whisperService;
    private final PdfService pdfService;

    public MeetingService(AppointmentRepository appointmentRepository, WhisperService whisperService, PdfService pdfService) {
        this.appointmentRepository = appointmentRepository;
        this.whisperService = whisperService;
        this.pdfService = pdfService;
    }

    public String processMeetingRecording(MultipartFile audioFile, Long appointmentId) throws Exception {
        // 1. Convert audio to text
        String transcript = whisperService.transcribeAudio(audioFile);

        // 2. Process text (simple summarization example)
        String summary = summarizeText(transcript);

        // 3. Generate PDF
        String pdfPath = pdfService.createSummaryPdf(summary, appointmentId);

        // 4. Update appointment
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow();
        appointment.setTranscriptPdfPath(pdfPath);
        appointment.setProcessingComplete(true);
        appointmentRepository.save(appointment);

        return pdfPath;
    }

    private String summarizeText(String text) {
        // Implement your NLP logic here
        return text.length() > 1000 ? text.substring(0, 1000) + "..." : text;
    }
}