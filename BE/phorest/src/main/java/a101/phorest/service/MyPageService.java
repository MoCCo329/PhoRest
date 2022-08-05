package a101.phorest.service;

import a101.phorest.domain.*;
//import a101.phorest.repository.MemberRepository;
import a101.phorest.dto.PostDto;
import a101.phorest.dto.UserDto;
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
import java.util.Optional;

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
        mypage.setShared(false);
        myPageRepository.save(mypage);
        return mypage.getId();
    }

    public List<PostDto> findByUserId(String searchUsername, String loginUsername)
    {
        List<Post> posts;
        if(searchUsername.equals(loginUsername))
        {
            posts = postRepository.findByUserId(searchUsername);
            System.out.println(posts.size());
        }
        else
        {
            posts = postRepository.findByUserIdShared(searchUsername);
        }
        List<PostDto> postDtos = new ArrayList<>();
        for(int i = 0; i < posts.size(); i++)
        {
            PostDto postDto = new PostDto(posts.get(i), new ArrayList<>());
            postDtos.add(postDto);
        }
        return postDtos;
    }

    public List<UserDto> findByPostId(Long postId)
    {
        List<User> users = userRepository.findByPostId(postId);
        List<UserDto> userDtos = new ArrayList<>();
        for(int i = 0; i < users.size(); i++) {
            UserDto userDto = UserDto.from(users.get(i));
            userDtos.add(userDto);
        }
        return userDtos;
    }

    public Long deletePost(Long postId, String username){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return 2L;
        Optional<MyPage> myPage = myPageRepository.findByPostIdAndUsername(postId, username);
        if(myPage.isEmpty())
            return 3L;
        myPageRepository.deleteById(myPage.get().getId());
        List<MyPage> myPages = myPageRepository.findByPostIdShared(postId);
        if(myPages.size() == 0)
            post.get().setShared(false);
        return 0L;
    }

    public Long sharePost(Long postId, String username){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return 2L;
        Optional<MyPage> myPage = myPageRepository.findByPostIdAndUsername(postId, username);
        if(myPage.isEmpty())
            return 3L;
        myPage.get().setShared(true);
        if(!post.get().isShared())
            post.get().setShared(true);
        return 0L;
    }
}
