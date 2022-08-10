package a101.phorest.repository;

import a101.phorest.domain.Like;
import a101.phorest.domain.MyPage;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface MyPageRepository extends JpaRepository<MyPage, Long> {

    @Query(nativeQuery = true, value ="select distinct * " +
            "from my_page pl join user r on pl.user_id = r.user_id " +
            "where pl.post_id = :postId " +
            "and r.username = :username")
    Optional<MyPage> findByPostIdAndUsername(@Param("postId") Long postId, @Param("username") String username);

    @Query(nativeQuery = true, value = "select distinct * " +
            "from my_page mp " +
            "where mp.post_id = :postId and mp.is_shared = true ")
    List<MyPage> findByPostIdShared(@Param("postId") Long postId);

    @Query(nativeQuery = true, value = "select * from my_page where user_id = :userId")
    List<MyPage> findAllByUserId(Long userId);

    @Query(nativeQuery = true, value = "delete from my_page where post_id =:postId")
    void deleteByPostId(Long postId);
}