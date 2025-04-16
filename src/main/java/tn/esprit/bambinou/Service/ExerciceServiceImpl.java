package tn.esprit.bambinou.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Exercice;
import tn.esprit.bambinou.Entity.Coaching;
import tn.esprit.bambinou.Repository.ExerciceRepository;
import tn.esprit.bambinou.Repository.CoachingRepository;

import java.util.List;

@Service
public class ExerciceServiceImpl implements IExerciceService {

    private final ExerciceRepository exerciceRepository;
    private final CoachingRepository coachingRepository;

    @Autowired
    public ExerciceServiceImpl(ExerciceRepository exerciceRepository, CoachingRepository coachingRepository) {
        this.exerciceRepository = exerciceRepository;
        this.coachingRepository = coachingRepository;
    }

    @Override
    public List<Exercice> retrieveAllExercices() {
        return exerciceRepository.findAll();
    }

    @Override
    public Exercice retrieveExercice(Long id) {
        return exerciceRepository.findById(id).orElseThrow(() -> new RuntimeException("Exercice non trouvé"));
    }

    @Override
    public Exercice addExercice(Exercice exercice) {
        // Récupérer le Coaching correspondant
        Coaching coaching = coachingRepository.findById(exercice.getCoaching().getIdCoaching())
                .orElseThrow(() -> new RuntimeException("Coaching non trouvé"));

        exercice.setCoaching(coaching);
        return exerciceRepository.save(exercice);
    }
    public Exercice likeExercice(Long id) {
        Exercice ex = exerciceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercice not found"));
        ex.setNbLike(ex.getNbLike() + 1);
        return exerciceRepository.save(ex);
    }

    public Exercice dislikeExercice(Long id) {
        Exercice ex = exerciceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercice not found"));
        ex.setNbDislike(ex.getNbDislike() + 1);
        return exerciceRepository.save(ex);
    }


    @Override
    public void removeExercice(Long id) {
        exerciceRepository.deleteById(id);
    }

    @Override
    public Exercice modifyExercice(Exercice exercice) {
        Exercice existingExercice = exerciceRepository.findById(exercice.getIdExercice())
                .orElseThrow(() -> new RuntimeException("Exercice non trouvé"));

        existingExercice.setName(exercice.getName());
        existingExercice.setDuration(exercice.getDuration());
        existingExercice.setVideoUrl(exercice.getVideoUrl());
        existingExercice.setImageUrl(exercice.getImageUrl());
        existingExercice.setCategory(exercice.getCategory());
        existingExercice.setDifficulty(exercice.getDifficulty());
        existingExercice.setDescription(exercice.getDescription());
        existingExercice.setIdExercice(exercice.getIdExercice());


        return exerciceRepository.save(existingExercice);
    }

}
