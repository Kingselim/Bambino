package tn.esprit.bambinou.Entity;

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
public class Babysitting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBabysitting;
    //private Long idUser;
    //private List<User> userList;
    private Date StartDate;
    private Date EndDate;
    private Long Duration;
    private Float Salary;
    private String Status;


    /*
    // Relation ManyToOne avec User
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private User user;

    // Relation OneToMany avec Baby
    @OneToMany(mappedBy = "babysitting", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Baby> babies;
    */
}
