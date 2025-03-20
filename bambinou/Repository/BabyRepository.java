package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Baby;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends JpaRepository<Baby, Long> {

    static Optional<Baby> findByBabiesIdBaby(Long idBaby) {
        return Optional.empty();
    }

    // Rechercher tous les babies par utilisateur (idUser)
    List<Baby> findByIdUser(Long idUser);
    /*
    // Récupérer tous les bébés liés à un babysitting spécifique
    List<Baby> findByBabysittingsIdBabysitting(Long idBabysitting);*/
}
