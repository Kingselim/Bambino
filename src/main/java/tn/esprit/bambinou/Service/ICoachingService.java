package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Coaching;
import java.util.List;

public interface ICoachingService {
    public List<Coaching> retrieveAllCoachings();
    public Coaching retrieveCoaching(Long id);
    public Coaching addCoaching(Coaching coaching);
    public void removeCoaching(Long id);
    public Coaching modifyCoaching( Coaching coaching);

   // List<Coaching> getCoachingsByUser(Long idUser);
}
