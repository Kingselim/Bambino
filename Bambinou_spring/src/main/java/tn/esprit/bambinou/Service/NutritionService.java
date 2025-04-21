package tn.esprit.bambinou.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.DTO.NutritionDeficiencyReport;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Repository.NutritionRepository;

@Service
public class NutritionService {
    @Autowired
    private NutritionRepository nutritionRepository;

    public NutritionDeficiencyReport generateDeficiencyReport(int userId) {
        Nutrition nutrition = nutritionRepository.findByUser_Id(userId);
        // or adapt depending on your model

        if (nutrition == null) {
            throw new RuntimeException("Nutrition data not found for baby with ID: " + userId);
        }

        float calories = nutrition.getCalories();
        float protein = nutrition.getProtein();
        float glucide = nutrition.getGlucide();
        float lipide = nutrition.getLipide();
        float vitamin = nutrition.getVitamin();

        boolean lowVitamin = vitamin < 10; // threshold example
        boolean lowCalories = calories < 800; // threshold example for babies
        boolean unbalancedMacros = !(
                protein >= 10 && protein <= 20 &&
                        glucide >= 45 && glucide <= 60 &&
                        lipide >= 25 && lipide <= 35
        );

        String recommendation = "All good!";
        if (lowVitamin || lowCalories || unbalancedMacros) {
            recommendation = "Adjust baby's diet. Consider consulting a pediatric nutritionist.";
        }

        return new NutritionDeficiencyReport(
                lowVitamin,
                lowCalories,
                unbalancedMacros,
                calories,
                protein,
                glucide,
                lipide,
                vitamin,
                recommendation
        );
    }

}
