//package a101.phorest.repository;
//
//import a101.phorest.domain.Like;
//import a101.phorest.domain.Member;
//import a101.phorest.domain.Post;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import javax.transaction.Transactional;
//import java.util.Optional;
//
//@Repository
//public interface LikeRepository extends JpaRepository<Like, Long> {
//    Optional<Like> findByMemberAndRecipe(Member member, Post Post);
//}
