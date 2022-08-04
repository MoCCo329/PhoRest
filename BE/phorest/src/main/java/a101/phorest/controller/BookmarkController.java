package a101.phorest.controller;

import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.BookmarkRepository;
import a101.phorest.repository.LikeRepository;
import a101.phorest.service.BookmarkService;
import a101.phorest.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class BookmarkController {
    private final BookmarkService bookmarkService;
    public final BookmarkRepository bookmarkRepository;

    public final TokenProvider tokenProvider;

    @PostMapping("community/{postId}/bookmark")
    @ResponseBody
    public String addLike(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            return "InvalidToken";

        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        if(bookmarkRepository.findByPostIdAndUsername(postId,username).isEmpty()) {
            return "add bookmark: " + bookmarkService.join(postId,username);
        }
        else{
            //return "delete: " + likeService.remove(likeRepository.findByPostIdAndUsername(postId,username).get());
            return "remove bookmark: " + bookmarkService.remove(postId,username);
        }
    }
}
