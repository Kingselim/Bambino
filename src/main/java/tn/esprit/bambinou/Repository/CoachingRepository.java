package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Coaching;

import java.util.List;

@Repository
public interface CoachingRepository extends JpaRepository<Coaching, Long> {
    //List<Coaching> findByIdUser(Long idUser);
}
