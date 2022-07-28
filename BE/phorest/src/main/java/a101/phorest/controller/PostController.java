package a101.phorest.controller;

import a101.phorest.domain.Post;
import a101.phorest.repository.PostRepository;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PostController {

    @Autowired
    private final PostService postService;
    @Autowired
    private final PostRepository postRepository;

    //post 새로 만들기 + postid 보내주기
//    @PostMapping("post/new")
//    @ResponseBody
//    public Long create(String category,String content){
//        Post post = new Post();
//
//        post.setCategory(category);
//        post.setTime(LocalDateTime.now());
//        post.setContent(content);
//        post.setLikeCount(0);
//
//        post.setId(postService.join(post));
//
//        return post.getId();
//    }
}
