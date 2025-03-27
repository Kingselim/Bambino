package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Expert;

import java.util.List;

import java.util.List;

public interface IExpertService {
    List<Expert> getAllExperts();
    Expert getExpertById(int id);
    Expert createExpert(Expert expert);
    Expert updateExpert(int id, Expert expert);
    void deleteExpert(int id);
}
