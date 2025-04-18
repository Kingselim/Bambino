package tn.esprit.bambinou.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@Service
public class WhisperService {

    public String transcribeAudio(MultipartFile audioFile) throws IOException {
        Path tempFile = Files.createTempFile("whisper_", ".wav");
        audioFile.transferTo(tempFile);

        try {
            // Windows-specific: Use full paths
            String pythonPath = "python";  // Change to your Python path
            String scriptPath = Paths.get("").toAbsolutePath() + "\\whisper_transcribe.py";

            ProcessBuilder pb = new ProcessBuilder(
                    pythonPath,
                    scriptPath,
                    tempFile.toString()
            );
            pb.redirectErrorStream(true);

            // Add ffmpeg path to environment
            pb.environment().put("PATH", pb.environment().get("PATH") +
                    ";D:\\ffmpeg-2025-03-13-git-958c46800e-essentials_build\\bin");

            Process process = pb.start();
            String transcript = new BufferedReader(new InputStreamReader(process.getInputStream()))
                    .lines().collect(Collectors.joining("\n"));

            int exitCode = process.waitFor();
            if (exitCode != 0) throw new RuntimeException("Whisper failed: " + transcript);

            return transcript;
        } catch (Exception e) {
            throw new IOException("Whisper error: " + e.getMessage());
        } finally {
            Files.deleteIfExists(tempFile);
        }
    }
}