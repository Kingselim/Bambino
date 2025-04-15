package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.DTO.ExpertDTO;
import tn.esprit.bambinou.DTO.ExpertResponseDTO;
import tn.esprit.bambinou.Entity.Expert;

import java.util.List;

import java.util.List;

public interface IExpertService {
    //List<Expert> getAllExperts();
    //Expert getExpertById(int id);
    Expert createExpert(Expert expert);
    //Expert updateExpert(int id, Expert expert);
    void deleteExpert(int id);



    List<ExpertResponseDTO> getAllExperts();
    ExpertResponseDTO getExpertById(int id);
    ExpertResponseDTO updateExpert(int id, ExpertDTO expertDTO);

    List<Expert> findBySpecialty(String specialty);

    ExpertResponseDTO rateExpert(int expertId, int rating);


}
