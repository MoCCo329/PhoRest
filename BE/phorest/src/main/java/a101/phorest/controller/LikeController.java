package a101.phorest.controller;

import a101.phorest.domain.Like;
import a101.phorest.dto.PostDto;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.LikeRepository;
import a101.phorest.service.LikeService;
import a101.phorest.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    public final LikeRepository likeRepository;

    public final TokenProvider tokenProvider;

    @PostMapping("community/{postId}/like")
    @ResponseBody
    public String addLike(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            return "InvalidToken";

        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        if(likeRepository.findByPostIdAndUsername(postId,username).isEmpty()) {
            return "like: " + likeService.join(postId,username);
        }
        else{
            //return "delete: " + likeService.remove(likeRepository.findByPostIdAndUsername(postId,username).get());
            return "unlike: " + likeService.remove(postId,username);

        }
    }
}
