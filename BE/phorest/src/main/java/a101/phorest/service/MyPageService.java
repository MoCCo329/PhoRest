package a101.phorest.service;

import a101.phorest.domain.*;
//import a101.phorest.repository.MemberRepository;
import a101.phorest.dto.UserDto;
import a101.phorest.repository.MyPageRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@Getter @Setter
@RequiredArgsConstructor
public class MyPageService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final MyPageRepository myPageRepository;

    public Long join(UserDto userDto, PostDto postDto)
    {
        Mypage mypage = new Mypage();
        User member = userRepository.findByUsername(userDto.getUsername());
        Post post = postRepository.findById(postDto.getId()).get();
        mypage.setUser(member);
        mypage.setPost(post);
        myPageRepository.save(mypage);
        return mypage.getId();
    }
}
