package a101.phorest.service;

import a101.phorest.domain.Comment;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import a101.phorest.dto.CommentDto;
import a101.phorest.repository.CommentRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public List<CommentDto> findComments(Long postId){
        List<Comment> comments = commentRepository.findAllByPostId(postId);
        List<CommentDto> commentDtos = new ArrayList<>();

        for(int i=0;i<comments.size();i++){
            CommentDto commentDto = new CommentDto(comments.get(i));
            commentDtos.add(commentDto);
        }
        return commentDtos;
    }

//    @Transactional
//    public List<CommentDto> findComments(Long postId, Long limit, Long offset){
//        List<CommentDto> commentDtos = new ArrayList<>();
//        commentRepository.findAllByPost(postId,limit,offset);
//    }

    @Transactional
    public Boolean join(Long postId, String username, String content){
        Comment comment = new Comment();

           User user = userRepository.findByUsername(username);
           Post post = postRepository.findById(postId).get();

        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(content);
        comment.setTime(LocalDateTime.now());

        commentRepository.save(comment);
        return true;
    }

    @Transactional
    public Boolean remove(Long PostId, Long CommentId, String username){
        if(userRepository.findById(CommentId).isPresent()){
            Comment comment = commentRepository.findById(CommentId).get();
            if (comment.getUser().getUsername().equals(username) && comment.getPost().getId().equals(PostId))
                commentRepository.deleteById(comment.getId());
            return true;
        }
        return false;
    }
}
