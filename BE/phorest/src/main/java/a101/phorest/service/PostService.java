package a101.phorest.service;

import a101.phorest.domain.*;
import a101.phorest.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;


    @Transactional
    public Long join(Images images, String category, String content){
        //validateDuplicateMember(post);
        Post post = new Post();
        post.setTime(LocalDateTime.now());
        post.setLikeCount(0);
        post.setCategory(category);
        post.setContent(content);
        if("photogroup".equals(category))
            post.setPhotoGroup((PhotoGroup) images);
        else if("frame".equals(category))
            post.setFrame((Frame) images);
        postRepository.save(post);
        return post.getId();
    }

    public Optional<PostDto> findDtoOne(Long postId){
        Optional <Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return Optional.empty();
        PostDto postDto = new PostDto(post.get());
        return Optional.of(postDto);

    }

    public Optional<Post> findOne(Long postId){
        return postRepository.findById(postId);
    }

    public List<PostDto> findByLikeCount(String category, Long limit, Long offset, Long humancount) {
        List<PostDto> postDtos = new ArrayList<>();
        List<Post> posts = new ArrayList<>();
        if(category.equals("photogroup"))
        {
            posts.addAll(postRepository.findPhotogroupByLikeCount("photogroup", limit, offset, humancount));

        }
        else if(category.equals("frame"))
        {
            posts.addAll(postRepository.findFrameByLikeCount("frame", limit, offset));
        }
        System.out.println(posts.size());
        for(int i = 0; i < posts.size(); i++) {
            PostDto postDto = new PostDto(posts.get(i));
            postDtos.add(postDto);
        }
        return postDtos;

    }
    /** 게시물 리스트 페이징 **/
    private static final int PAGE_POST_COUNT = 20;

    //https://velog.io/@jyleedev/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8JPA%ED%83%80%EC%9E%84%EB%A6%AC%ED%94%84-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%B5%9C%EC%8B%A0%EC%88%9C-%EC%A2%8B%EC%95%84%EC%9A%94%EC%88%9C-%EC%A1%B0%ED%9A%8C%EC%88%98%EC%88%9C-%EC%A1%B0%ED%9A%8C

}
