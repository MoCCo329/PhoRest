package a101.phorest.repository;
import a101.phorest.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


    Optional<Post> findById(Long id);
    @Query(nativeQuery = true, value = "select distinct * from post p " +
            "join photo_group q on p.photogroup_id = q.photogroup_id " +
            "where q.human_count = :humancount " +
            "and p.category like :category and p.is_shared = true " +
            "order by p.like_count desc , p.time desc LIMIT :limit offset :offset")
    List<Post> findPhotogroupByLikeCount(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset, @Param("humancount") Long humancount);


    @Query(nativeQuery = true, value = "select distinct * " +
            "from post p " +
            "where p.category like :category and p.is_shared = true " +
            "order by p.like_count desc , p.time desc LIMIT :limit offset :offset")
    List<Post> findFrameByLikeCount(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset);

    @Query(nativeQuery = true, value = "select * " +
            "from (post p join my_page q on p.post_id = q.post_id) join user r on q.user_id = r.user_id " +
            "where r.username like :username")
    List<Post> findByUserId(@Param("username") String username);

    // 해당 post id로 mypage를 찾고 그중 shared = 1 이 있는 postid를 찾기.
    @Query(nativeQuery = true, value = "select * from my_page mp where mp.post_id = :postId and mp.is_shared = true")
    List<Post> findPostIdByMyPageShared(@Param ("postId") Long postId);


    @Query(nativeQuery = true, value = "select * " +
            "from (post p join my_page q on p.post_id = q.post_id) join user r on q.user_id = r.user_id " +
            "where r.username = :username and q.is_shared = true")
    List<Post> findByUserIdShared(@Param("username") String username);

    @Query(nativeQuery = true, value = "select distinct * from post p " +
            "join photo_group q on p.photogroup_id = q.photogroup_id " +
            "where q.human_count = :humancount " +
            "and p.category like :category and p.is_shared = true " +
            "order by  p.time desc , p.like_count desc LIMIT :limit offset :offset")
    List<Post> findPhotogroupByRecent(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset, @Param("humancount") Long humancount);

    @Query(nativeQuery = true, value = "select distinct * " +
            "from post p " +
            "where p.category like :category and p.is_shared = true " +
            "order by p.time desc ,p.like_count desc LIMIT :limit offset :offset")
    List<Post> findFrameByRecent(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset);

    @Query(nativeQuery = true, value = "select distinct * " +
            "from post p " +
            "where p.category = :category ")
    List<Post> countFramePostsByCategory(@Param("category") String category);

    @Query(nativeQuery = true, value = "select distinct * " +
            "from post p join photo_group q on p.photogroup_id = q.photogroup_id " +
            "where p.category = :category and q.human_count = :humanCount ")
    List<Post> countPhotogroupPostsByCategory(@Param("category") String category, @Param("humanCount") Long humanCount);

    @Query(nativeQuery = true, value = "select distinct *" +
            "from post p join bookmark b on p.post_id = b.post_id join user r on b.user_id = r.user_id " +
            "where r.username = :username and p.is_shared = true ")
    List<Post> findPostBookmarked(@Param("username") String username);

    @Query(nativeQuery = true, value = "select distinct *" +
            "from post p " +
            "where datediff(:now, p.time) = 7 and p.category = :category ")
    List<Post> findMessagePost(@Param("now")LocalDateTime now, @Param("category") String category);

}
