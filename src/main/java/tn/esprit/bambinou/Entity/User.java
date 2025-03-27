package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;




@Entity
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@JsonIgnoreProperties({"clientAppointments"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String age;
    private String email;
    private String password;


   // @OneToOne(cascade = CascadeType.ALL)
    //private RoleType role;


    @ManyToMany
    @JoinTable(
            name = "user_roles", // Nom de la table intermédiaire
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleType> roleTypes = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    //@JsonIgnore
    private Set<Appointment> clientAppointments = new HashSet<>();


    public User(String name, String age, String email, String password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RoleType> getRoleTypes() {
        return roleTypes;
    }

    public void setRoleTypes(Set<RoleType> roleTypes) {
        this.roleTypes = roleTypes;
    }

    public Set<Appointment> getClientAppointments() {
        return clientAppointments;
    }

    public void setClientAppointments(Set<Appointment> clientAppointments) {
        this.clientAppointments = clientAppointments;
    }
}
