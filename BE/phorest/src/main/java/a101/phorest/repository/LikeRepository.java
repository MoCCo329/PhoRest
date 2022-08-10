package a101.phorest.repository;

import a101.phorest.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query(nativeQuery = true, value ="select distinct * " +
            "from postlike pl join user r on pl.user_id = r.user_id " +
            "where pl.post_id = :postId " +
            "and r.username = :username")
    Optional<Like> findByPostIdAndUsername(@Param("postId") Long postId, @Param("username") String username);

    @Modifying
    @Query(nativeQuery = true, value = "delete from postlike where user_id =:userId")
    void deleteAllByUserId(Long userId);

    @Modifying
    @Query(nativeQuery = true, value = "delete from postlike where post_id =:id")
    void deleteAllByPostId(Long id);

    @Modifying
    @Query(nativeQuery = true, value = "select * from postlike where user_id =:userId")
    List<Like> findAllByUserId(Long userId);
    @Modifying
    @Query(nativeQuery = true, value = "delete from my_page mp where mp.post_id = :postId ")
    void deleteByPostId(@Param("postId") Long postId);
}
