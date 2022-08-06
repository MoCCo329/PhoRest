package a101.phorest.controller;

import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.BookmarkRepository;
import a101.phorest.repository.LikeRepository;
import a101.phorest.service.BookmarkService;
import a101.phorest.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class BookmarkController {
    private final BookmarkService bookmarkService;
    public final BookmarkRepository bookmarkRepository;

    public final TokenProvider tokenProvider;

    @PostMapping("community/{postId}/bookmark")
    @ResponseBody
    public int addLike(@PathVariable("postId") String postIdEncoded, @RequestHeader("Authorization") String token){
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = (Long.parseLong(decodedString) - 37) / 73;
        if(!tokenProvider.validateToken(token))
            //return "InvalidToken";
            return 2;

        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        if(bookmarkRepository.findByPostIdAndUsername(postId,username).isEmpty()) {
            bookmarkService.join(postId,username);
            return 1;
        }
        else{
            bookmarkService.remove(postId,username);
            return 0;
        }
    }
}
