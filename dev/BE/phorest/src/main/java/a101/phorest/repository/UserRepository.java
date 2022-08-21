package a101.phorest.repository;

import a101.phorest.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//   @EntityGraph(attributePaths = "authorities")
//   Optional<User> findOneWithAuthoritiesByUsername(String username);

   @Query(nativeQuery = true, value = "select * from user u where binary (u.username) = :username ")
   User findByUsername(@Param("username") String username);

   User findByPhone(String phone);

   @Query(nativeQuery = true, value = "select * from user u where u.nickname like %:nickname% and u.username != 'unkn0wnuser'")
   List<User> findAllByNickname(@Param("nickname") String nickname);

   @Query(nativeQuery = true, value = "select distinct * " +
           "from user u join my_page m on u.user_id = m.user_id " +
           "where m.post_id = :postId and m.is_shared = true")
   List<User> findPostMyPageSharedUsers(@Param("postId") Long postId);

   @Query(nativeQuery = true, value = "select distinct *" +
           "from user q join my_page p on q.user_id = p.user_id " +
           "where p.post_id = :postId")
   List<User> findByPostId(@Param("postId") Long postId);
}
