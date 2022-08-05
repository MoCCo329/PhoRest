package a101.phorest.controller;

import a101.phorest.domain.Post;
import a101.phorest.dto.PostDto;
import a101.phorest.jwt.JwtFilter;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.MyPageService;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    private final TokenProvider tokenProvider;

    @ResponseBody
    @GetMapping("mypage/{username}")
    public List<PostDto> findByUserId(@PathVariable("username") String searchUsername, @RequestHeader(value = "Authorization", required = false) String token)
    {
        String loginUsername;
        if(token == null)
        {
            loginUsername = "";
        }
        else if(tokenProvider.validateToken(token))
        {
            loginUsername = (String)tokenProvider.getTokenBody(token).get("sub");
        }
        else
        {
            return new ArrayList<>();
        }
        return myPageService.findByUserId(searchUsername, loginUsername);
    }

    @PostMapping("mypage/{postId}/add")
    @ResponseBody
    public boolean addPost(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return myPageService.join(postId, username) != -1L;
    }


    @PostMapping("mypage/{postId}/share")
    @ResponseBody
    public Long sharePost(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token)
    {
        if(!tokenProvider.validateToken(token))
            return 1L;

        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return myPageService.sharePost(postId, username);
    }
}
