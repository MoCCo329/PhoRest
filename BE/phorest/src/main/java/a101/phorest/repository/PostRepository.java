/*
package a101.phorest.repository;

import a101.phorest.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepository {
    private final EntityManager em;

    public void save(Post post){
        em.persist(post);
    }
    // 글 수정하기 => save로 하면됨

    // 글 삭제

    // 글 조회
    public Post findOne(Long id){
        return em.find(Post.class,id);
    }



    */
/**아래 수정 필요*//*

    ///https://velog.io/@jyleedev/%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5
    //글 여러개 조회
    // 인기 순위로 보여주기 => like와 조인해서,, 개수 찾기,,
    //select post_id from
    public List<Post> findByMostLikes(){
        return em.createQuery("select p from Post p order by p.likeCount desc ",Post.class)
                .getResultList();
    }

    // 최신 순으로 보여주기
    public List<Post> findByRecent(){
        return em.createQuery("select p from Post p ",Post.class)
                .getResultList();
    }

}
*/


package a101.phorest.repository;
import a101.phorest.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


    Optional<Post> findById(Long id);
    @Query(nativeQuery = true, value = "select distinct * from post p " +
            "natural join photo_group q " +
            "where q.human_count = :humancount " +
            "and p.category like :category " +
            "order by p.like_count, p.time desc LIMIT :limit offset :offset")
    List<Post> findPhotogroupByLikeCount(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset, @Param("humancount") Long humancount);


    @Query(nativeQuery = true, value = "select distinct * from post p where p.category like :category order by p.like_count, p.time desc LIMIT :limit offset :offset")
    List<Post> findFrameByLikeCount(@Param("category") String category, @Param("limit") Long limit, @Param("offset") Long offset);

    @Query(nativeQuery = true, value = "select * " +
            "from (post p join my_page q on p.post_id = q.post_id) " +
            "join user r on q.user_id = r.user_id " +
            "where r.username like :username")
    List<Post> findByUserId(@Param("username") String username);

    @Query(nativeQuery = true, value = "select * " +
            "(from my_page p join post q on p.post_id = q.post_id) " +
            "join user r on p.user_id = r.user_id " +
            "where r.username = :username and q.is_shared = true")
    List<Post> findByUserIdShared(@Param("username") String username);


}
