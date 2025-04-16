package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Exercice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idExercice;

    private String name;
    private int duration;
    private String videoUrl;
    private String imageUrl;
    private String category;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String description;

    private int likes = 0;
    private int dislikes = 0;

    // Alias pour exposer dans JSON sans être en base
    @Transient
    private int nbLike;

    @Transient
    private int nbDislike;

    @ManyToOne
    @JoinColumn(name = "id_coaching")
    @JsonIgnoreProperties("exercices")
    private Coaching coaching;

    // Getters / Setters

    public Long getIdExercice() {
        return idExercice;
    }

    public void setIdExercice(Long idExercice) {
        this.idExercice = idExercice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Coaching getCoaching() {
        return coaching;
    }

    public void setCoaching(Coaching coaching) {
        this.coaching = coaching;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    // Aliases dynamiques exposés dans le JSON
    public int getNbLike() {
        return this.likes;
    }

    public int getNbDislike() {
        return this.dislikes;
    }

    public void setNbLike(int nbLike) {
        this.nbLike = nbLike;
    }

    public void setNbDislike(int nbDislike) {
        this.nbDislike = nbDislike;
    }
}
