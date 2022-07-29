package a101.phorest.service;

import a101.phorest.domain.*;
import a101.phorest.repository.MemberRepository;
import a101.phorest.repository.MyPageRepository;
import a101.phorest.repository.PostRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@Getter @Setter
@RequiredArgsConstructor
public class MyPageService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final MyPageRepository myPageRepository;

    public Long join(MemberDto memberDto, PostDto postDto)
    {
        Mypage mypage = new Mypage();
        Member member = memberRepository.findOne(memberDto.getId());
        Post post = postRepository.findById(postDto.getId()).get();
        mypage.setMember(member);
        mypage.setPost(post);
        myPageRepository.save(mypage);
        return mypage.getId();
    }
}
