package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Forum;

public interface ForumRepository extends JpaRepository<Forum, Long> {
}
