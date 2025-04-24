package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Entity.enumrole;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN u.roleTypes r WHERE r.role = :role")
    List<User> findUsersByRole(@Param("role") enumrole role);

}
