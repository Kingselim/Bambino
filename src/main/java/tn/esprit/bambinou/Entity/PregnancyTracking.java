package tn.esprit.bambinou.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PregnancyTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPregnancyTracking;
    private Long idUser; // id patirent mteana
    //private List<User> ListUser ;// list user les medecins eli aandhom acces ll tracking hetheya
    private Date DatePregnancyTracking;
    private String NamePregnancyTracking;
    private IntervalChoice intervalChoice;

    public Long getIdPregnancyTracking() {
        return idPregnancyTracking;
    }

    public void setIdPregnancyTracking(Long idPregnancyTracking) {
        this.idPregnancyTracking = idPregnancyTracking;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

   /* public List<User> getListUser() {
        return ListUser;
    }

    public void setListUser(List<User> listUser) {
        ListUser = listUser;
    }
*/
    public Date getDatePregnancyTracking() {
        return DatePregnancyTracking;
    }

    public void setDatePregnancyTracking(Date datePregnancyTracking) {
        DatePregnancyTracking = datePregnancyTracking;
    }

    public String getNamePregnancyTracking() {
        return NamePregnancyTracking;
    }

    public void setNamePregnancyTracking(String namePregnancyTracking) {
        NamePregnancyTracking = namePregnancyTracking;
    }

    public IntervalChoice getIntervalChoice() {
        return intervalChoice;
    }

    public void setIntervalChoice(IntervalChoice intervalChoice) {
        this.intervalChoice = intervalChoice;
    }
}
