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



    /**아래 수정 필요*/
    ///https://velog.io/@jyleedev/%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5
    //글 여러개 조회
    // 인기 순위로 보여주기 => like와 조인해서,, 개수 찾기,,
    //select post_id from
    public List<Post> findByMostLikes(){
        return em.createQuery("select p from Post p ",Post.class)
                .getResultList();
    }

    // 최신 순으로 보여주기
    public List<Post> findByRecent(){
        return em.createQuery("select p from Post p ",Post.class)
                .getResultList();
    }

}
