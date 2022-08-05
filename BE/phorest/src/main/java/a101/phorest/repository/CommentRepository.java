package a101.phorest.repository;

import a101.phorest.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByPostId(Long postId);

    Optional<Comment> findById(Long commentId);
}