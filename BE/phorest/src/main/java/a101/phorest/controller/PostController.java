package a101.phorest.controller;

import a101.phorest.domain.*;
import a101.phorest.dto.UserDto;
import a101.phorest.service.MyPageService;
import a101.phorest.service.PostService;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    private final MyPageService myPageService;
    @GetMapping("download/{post_id}")
    @ResponseBody
    public PostDto SendPost(@PathVariable("post_id") Long id){
        Optional<PostDto> postDto = postService.findDtoOne(id);
        if(postDto.isEmpty())
            return new PostDto();
        return postDto.get();
    }

    @GetMapping("download/{post_id}/add")
    @ResponseBody
    public boolean addPost(@PathVariable("post_id") Long post_id, @RequestParam("username") String username){
        Optional<UserDto> user = userService.findDtoUsernameOne(username);
        Optional<PostDto> post = postService.findDtoOne(post_id);
        if(user.isEmpty() || post.isEmpty())
            return false;
        myPageService.join(user.get(), post.get());
        return true;
    }
}
