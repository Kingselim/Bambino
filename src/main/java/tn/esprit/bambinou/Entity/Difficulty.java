package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum Difficulty {
    Easy, Medium, Hard ;

    @JsonCreator
    public static Difficulty fromString(String key) {
        return Arrays.stream(Difficulty.values())
                .filter(e -> e.name().equalsIgnoreCase(key))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid difficulty: " + key));
    }
}


