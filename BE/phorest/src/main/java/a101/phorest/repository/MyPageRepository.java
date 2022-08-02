package a101.phorest.repository;

import a101.phorest.domain.MyPage;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyPageRepository extends JpaRepository<MyPage, Long> {
    @Query(nativeQuery = true, value = "select q from Mypage p join Post q on p.post_id = q.post_id where p.user_id = :userId")
    List<Post> findByUserId(@Param("userId") Long userId);

    @Query(nativeQuery = true, value = "select q from Mypage p join User q on p.user_id = q.user_id where p.post_id = :postId")
    List<User> findByPostId(@Param("postId") Long postId);
}