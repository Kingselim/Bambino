package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Coaching;
import tn.esprit.bambinou.Entity.Exercice;
import tn.esprit.bambinou.Repository.CoachingRepository;

import java.util.List;

@Service
 // Cette annotation génère un constructeur avec toutes les dépendances nécessaires
public class CoachingServiceImpl implements ICoachingService {

    private final CoachingRepository coachingRepository;

    // Constructor injection via Lombok, Spring n'a pas besoin d'@Autowired ici,
    // car Lombok crée un constructeur avec tous les arguments. On peut l'ajouter si nécessaire
    @Autowired
    public CoachingServiceImpl(CoachingRepository coachingRepository) {
        this.coachingRepository = coachingRepository;
    }

    @Override
    public List<Coaching> retrieveAllCoachings() {
        return coachingRepository.findAll();
    }

    @Override
    public Coaching retrieveCoaching(Long id) {
        return coachingRepository.findById(id).orElse(null);
    }

    @Override
    public Coaching addCoaching(Coaching coaching) {
        // Lier chaque exercice au coaching avant la sauvegarde
        if (coaching.getExercices() != null) {
            for (Exercice exercice : coaching.getExercices()) {
                exercice.setCoaching(coaching);
            }
        }

        return coachingRepository.save(coaching);
    }


    @Override
    public void removeCoaching(Long id) {
        coachingRepository.deleteById(id);
    }

    @Override
    public Coaching modifyCoaching(Coaching coaching) {
        if (coachingRepository.existsById(coaching.getIdCoaching())) {
            return coachingRepository.save(coaching);
        } else {
            throw new RuntimeException("Coaching avec ID " + coaching.getIdCoaching() + " non trouvé.");
        }
    }

    /*
    @Override
    public List<Coaching> getCoachingsByUser(Long idUser) {
        return coachingRepository.findByIdUser(idUser);
    }
    */
}
