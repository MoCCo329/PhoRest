package a101.phorest.service;

import a101.phorest.domain.Like;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import a101.phorest.repository.LikeRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Table;


@Service
@Getter
@Setter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikeService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;


    @Transactional
    public Long join(Long postId, String username)
    {
        Like like = new Like();
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findById(postId).get();
        like.setUser(user);
        like.setPost(post);
        likeRepository.save(like);
        //like.Like();
        return like.getId();
    }

    @Transactional
    public Long remove(Like like)
    {
        //ike.Unlike();
        Long id = like.getId();
        likeRepository.deleteById(id);
        return id;
    }
}
