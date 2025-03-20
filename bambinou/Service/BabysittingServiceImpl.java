package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Repository.BabyRepository;
import tn.esprit.bambinou.Repository.BabysittingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BabysittingServiceImpl implements IBabysittingService {
    @Autowired
    private BabysittingRepository babysittingRepository;

    @Override
    public List<Babysitting> retrieveAllBabysittings() {
        return babysittingRepository.findAll();
    }

    @Override
    public Babysitting retrieveBabysitting(Long id) {
        return babysittingRepository.findById(id).orElse(null);
    }

    @Override
    public Babysitting addBabysitting(Babysitting babysitting) {
        return babysittingRepository.save(babysitting);
    }

    @Override
    public void removeBabysitting(Long id) {
        babysittingRepository.deleteById(id);
    }

    @Override
    public Babysitting modifyBabysitting(Babysitting babysitting) {
        return babysittingRepository.save(babysitting);
    }

//    @Override
//    public List<Babysitting> getBabysittingsByUser(Long idUser) {
//        return babysittingRepository.findByIdUser(idUser);
//    }

    /*
    //affectation Baby to Babysitting
    @Override
    public Babysitting assignBabyToBabysitting(Long idBabysitting, Long idBaby) {
        Optional<Babysitting> babysittingOpt = babysittingRepository.findById(idBabysitting);
        Optional<Baby> babyOpt = BabyRepository.findByBabiesIdBaby(idBaby);

        if (babysittingOpt.isPresent() && babyOpt.isPresent()) {
            Babysitting babysitting = babysittingOpt.get();
            Baby baby = babyOpt.get();

            babysitting.getBabies().add(baby);
            return babysittingRepository.save(babysitting);
        }
        return null;
        }

    }*/
}
