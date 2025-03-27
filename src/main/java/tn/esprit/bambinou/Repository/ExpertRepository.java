package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Expert;

import java.util.List;

public interface ExpertRepository extends JpaRepository<Expert, Integer> {
    //List<Expert> findBySpecialty(String speciality);
}
