package a101.phorest.repository;

import a101.phorest.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//   @EntityGraph(attributePaths = "authorities")
//   Optional<User> findOneWithAuthoritiesByUsername(String username);

   User findByUsername(String username);

   User findByNickname(String nickname);
   User findByPhone(String phone);
}
