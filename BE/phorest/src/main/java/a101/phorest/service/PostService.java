package a101.phorest.service;

import a101.phorest.domain.Member;
import a101.phorest.domain.Post;
import a101.phorest.repository.MemberRepository;
import a101.phorest.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;


    @Transactional
    public Long join(Post post){
        //validateDuplicateMember(post);
        post.setTime(LocalDateTime.now());
        post.setLikeCount(0);
        postRepository.save(post);
        return post.getId();
    }

    public Post findOne(Long postId){
        return postRepository.findOne(postId);
    }

    /** 게시물 리스트 페이징 **/
    private static final int PAGE_POST_COUNT = 20;

    //https://velog.io/@jyleedev/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8JPA%ED%83%80%EC%9E%84%EB%A6%AC%ED%94%84-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%B5%9C%EC%8B%A0%EC%88%9C-%EC%A2%8B%EC%95%84%EC%9A%94%EC%88%9C-%EC%A1%B0%ED%9A%8C%EC%88%98%EC%88%9C-%EC%A1%B0%ED%9A%8C

}
