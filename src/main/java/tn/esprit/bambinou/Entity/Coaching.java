package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coaching {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCoaching;

    private Long idUser;
    @Temporal(TemporalType.DATE)
    private Date SessionDate;
    private String Description;
    private String NameCoaching;
    @Column(length = 500)
    private String Image;

    @OneToMany(mappedBy = "coaching", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("coaching") // ← très important ici
    private List<Exercice> exercices;


    public Long getIdCoaching() {
        return idCoaching;
    }

    public void setIdCoaching(Long idCoaching) {
        this.idCoaching = idCoaching;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Date getSessionDate() {
        return SessionDate;
    }

    public void setSessionDate(Date sessionDate) {
        SessionDate = sessionDate;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getNameCoaching() {
        return NameCoaching;
    }

    public void setNameCoaching(String nameCoaching) {
        NameCoaching = nameCoaching;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public List<Exercice> getExercices() {
        return exercices;
    }

    public void setExercices(List<Exercice> exercices) {
        this.exercices = exercices;
    }
}
