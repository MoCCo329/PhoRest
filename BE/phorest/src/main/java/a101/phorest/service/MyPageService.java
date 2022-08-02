package a101.phorest.service;

import a101.phorest.domain.*;
//import a101.phorest.repository.MemberRepository;
import a101.phorest.dto.PostDto;
import a101.phorest.repository.MyPageRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Getter @Setter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final MyPageRepository myPageRepository;

    @Transactional
    public Long join(Long postId, String username)
    {
        MyPage mypage = new MyPage();
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findById(postId).get();
        mypage.setUser(user);
        mypage.setPost(post);
        myPageRepository.save(mypage);
        return mypage.getId();
    }

    public List<PostDto> findByUserId(Long userId)
    {
        List<Post> posts = myPageRepository.findByUserId(userId);
        List<PostDto> postDtos = new ArrayList<>();
        for(int i = 0; i < posts.size(); i++)
        {
            PostDto postDto = new PostDto(posts.get(i));
            postDtos.add(postDto);
        }
        return postDtos;
    }
}
