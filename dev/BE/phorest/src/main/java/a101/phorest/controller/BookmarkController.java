package a101.phorest.controller;

import a101.phorest.dto.PostDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.BookmarkRepository;
import a101.phorest.repository.LikeRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.service.BookmarkService;
import a101.phorest.service.LikeService;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class BookmarkController {
    private final BookmarkService bookmarkService;
    public final BookmarkRepository bookmarkRepository;

    public final TokenProvider tokenProvider;

    private final PostService postService;

    @PostMapping("community/{postId}/bookmark")
    @ResponseBody
    public PostDTO addLike(@PathVariable("postId") String postIdEncoded, @RequestHeader("Authorization") String token){
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        if(!decodedString.matches("[+-]?\\d*(\\.\\d+)?")) return new PostDTO();
        Double decodedNumber = (Double.parseDouble(decodedString) - 37) / 73;
        Long postId = decodedNumber.longValue();
        if(postId - decodedNumber != 0)
            return new PostDTO();
        if(!tokenProvider.validateToken(token))
            //return "InvalidToken";
            return new PostDTO();

        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        if(bookmarkRepository.findByPostIdAndUsername(postId,username).isEmpty()) {
            bookmarkService.join(postId,username);
            return postService.findDtoOne(0L,postId,username).get();
        }
        else{
            bookmarkService.remove(postId,username);
            return postService.findDtoOne(0L,postId,username).get();
        }
    }
}
