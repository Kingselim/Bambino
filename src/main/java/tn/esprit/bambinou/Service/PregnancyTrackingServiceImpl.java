package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.PregnancyTracking;
import tn.esprit.bambinou.Repository.PregnancyTrackingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PregnancyTrackingServiceImpl implements IPregnancyTrackingService {
    @Autowired
    private PregnancyTrackingRepository pregnancyTrackingRepository;

    @Override
    public List<PregnancyTracking> retrieveAllPregnancyTrackings() {
        return pregnancyTrackingRepository.findAll();
    }

    @Override
    public PregnancyTracking retrievePregnancyTracking(Long pregnancyTrackingId) {
        return pregnancyTrackingRepository.findById(pregnancyTrackingId).orElse(null);
    }


    @Override
    public PregnancyTracking addPregnancyTracking(PregnancyTracking pregnancyTracking) {
        return pregnancyTrackingRepository.save(pregnancyTracking);
    }

    @Override
    public void removePregnancyTracking(Long pregnancyTrackingId) {
        pregnancyTrackingRepository.deleteById(pregnancyTrackingId);
    }

    @Override
    /*public PregnancyTracking modifyPregnancyTracking(PregnancyTracking pregnancyTracking) {
        return pregnancyTrackingRepository.save(pregnancyTracking);
    }*/

    public PregnancyTracking modifyPregnancyTracking(PregnancyTracking pregnancyTracking) {
        if (pregnancyTrackingRepository.existsById(pregnancyTracking.getIdPregnancyTracking())) {
            return pregnancyTrackingRepository.save(pregnancyTracking);
        } else {
            throw new RuntimeException("Tracking ID " + pregnancyTracking.getIdPregnancyTracking() + " not found.");
        }
    }

}
