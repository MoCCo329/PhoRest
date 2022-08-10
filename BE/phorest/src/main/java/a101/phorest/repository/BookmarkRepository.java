package a101.phorest.repository;

import a101.phorest.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Query(nativeQuery = true, value ="select distinct * " +
            "from bookmark pl join user r on pl.user_id = r.user_id " +
            "where pl.post_id = :postId " +
            "and r.username = :username")
    Optional<Bookmark> findByPostIdAndUsername(@Param("postId") Long postId, @Param("username") String username);

    @Modifying
    @Query(nativeQuery = true, value = "delete from bookmark where user_id =:userId")
    void deleteAllByUserId(Long userId);

    @Modifying
    @Query(nativeQuery = true, value = "delete from bookmark where post_id =:id")
    void deleteAllbyPostId(Long id);

    @Modifying
    @Query(nativeQuery = true, value = "delete from my_page mp where mp.post_id = :postId ")
    void deleteByPostId(@Param("postId") Long postId);
}
