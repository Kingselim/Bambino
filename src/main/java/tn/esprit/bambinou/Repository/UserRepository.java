package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Expert;
import tn.esprit.bambinou.Entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //@Query("SELECT u FROM User u JOIN u.roleTypes r WHERE r.role = :role")
    //List<Expert> findByRole(String role);
}
