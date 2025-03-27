package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Expert;
import tn.esprit.bambinou.Repository.ExpertRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpertServiceImpl implements IExpertService {

    @Autowired
    private ExpertRepository expertRepository;

    @Override
    public List<Expert> getAllExperts() {
        return expertRepository.findAll();
    }

    @Override
    public Expert getExpertById(int id) {
        return expertRepository.findById(id).orElseThrow(() -> new RuntimeException("Expert not found"));
    }

    @Override
    public Expert createExpert(Expert expert) {
        return expertRepository.save(expert);
    }

    @Override
    public Expert updateExpert(int id, Expert expert) {
        Expert existingExpert = getExpertById(id);
        existingExpert.setName(expert.getName());
        existingExpert.setAge(expert.getAge());
        existingExpert.setEmail(expert.getEmail());
        existingExpert.setPassword(expert.getPassword());
        existingExpert.setSpecialty(expert.getSpecialty());
        return expertRepository.save(existingExpert);
    }

    @Override
    public void deleteExpert(int id) {
        expertRepository.deleteById(id);
    }
}
