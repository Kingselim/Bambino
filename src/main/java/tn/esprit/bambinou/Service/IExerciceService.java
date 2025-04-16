package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Exercice;
import java.util.List;

public interface IExerciceService {
    List<Exercice> retrieveAllExercices();
    Exercice retrieveExercice(Long id);
    Exercice addExercice(Exercice exercice);
    void removeExercice(Long id);
    Exercice modifyExercice(Exercice exercice);
}

