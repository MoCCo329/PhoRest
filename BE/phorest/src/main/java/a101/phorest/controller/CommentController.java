package a101.phorest.controller;

import a101.phorest.dto.CommentDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/community")
public class CommentController {

    private final CommentService commentService;

    public final TokenProvider tokenProvider;

    @GetMapping("{postId}/comment") // 댓글 목록
    public List<CommentDTO> commentList(@PathVariable("postId") String postIdEncoded){
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = Long.parseLong(decodedString);
        return commentService.findComments(postId);
    }
    
    @PostMapping("{postId}/comment") // 댓글 생성
    public Boolean newComment(@PathVariable("postId") String postIdEncoded, @RequestHeader("Authorization") String token, @Valid @RequestBody Map<String, String> content) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = Long.parseLong(decodedString);
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.join(postId,username,content.get("content"));
    }
    
    @DeleteMapping("{postId}/comment/{commentId}") //댓글 삭제
    public Boolean deleteComment(@PathVariable("postId") String postIdEncoded, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = Long.parseLong(decodedString);
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.remove(postId,commentId,username);
    }

    @PutMapping("{postId}/comment/{commentId}") // 댓글 수정
    public int editComment(@PathVariable("postId") String postIdEncoded, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token,@Valid @RequestBody Map<String, String> content) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = Long.parseLong(decodedString);
        //수정완료 0 수정못함 1
        if(!tokenProvider.validateToken(token)) return 3;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.change(postId,commentId,username,content.get("content"));

    }

}
