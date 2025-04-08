package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
