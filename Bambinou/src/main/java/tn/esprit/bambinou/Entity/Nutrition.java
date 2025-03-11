package tn.esprit.bambinou.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nutrition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNutrition;
    private Long idUser;
    private String Recommendation;
    private String Description;
    private int NbFollowers;
    private float Calories;
    private float Protein;
    private float Glucide;
    private float Lipide;
    private float Vitamin;

    public Long getIdNutrition() {
        return idNutrition;
    }

    public void setIdNutrition(Long idNutrition) {
        this.idNutrition = idNutrition;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getRecommendation() {
        return Recommendation;
    }

    public void setRecommendation(String recommendation) {
        Recommendation = recommendation;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public int getNbFollowers() {
        return NbFollowers;
    }

    public void setNbFollowers(int nbFollowers) {
        NbFollowers = nbFollowers;
    }

    public float getCalories() {
        return Calories;
    }

    public void setCalories(float calories) {
        Calories = calories;
    }

    public float getProtein() {
        return Protein;
    }

    public void setProtein(float protein) {
        Protein = protein;
    }

    public float getGlucide() {
        return Glucide;
    }

    public void setGlucide(float glucide) {
        Glucide = glucide;
    }

    public float getLipide() {
        return Lipide;
    }

    public void setLipide(float lipide) {
        Lipide = lipide;
    }

    public float getVitamin() {
        return Vitamin;
    }

    public void setVitamin(float vitamin) {
        Vitamin = vitamin;
    }
}
