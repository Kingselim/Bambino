package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Exercice;

public interface ExerciceRepository extends JpaRepository<Exercice, Long> {
}

