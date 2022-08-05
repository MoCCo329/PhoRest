package a101.phorest.controller;

import a101.phorest.dto.CommentDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/community")
public class CommentController {

    private final CommentService commentService;

    public final TokenProvider tokenProvider;

    @GetMapping("{postId}/comment") // 댓글 목록
    public List<CommentDTO> commentList(@PathVariable("postId") Long postId){
        return commentService.findComments(postId);
    }
    
    @PostMapping("{postId}/comment") // 댓글 생성
    public Boolean newComment(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token, @Valid @RequestBody Map<String, String> content) {
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.join(postId,username,content.get("content"));
    }
    
    @DeleteMapping("{postId}/comment/{commentId}") //댓글 삭제
    public Boolean deleteComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token) {
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.remove(postId,commentId,username);
    }

    @PutMapping("{postId}/comment/{commentId}") // 댓글 수정
    public int editComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token,@Valid @RequestBody Map<String, String> content) {
        //수정완료 0 수정못함 1
        if(!tokenProvider.validateToken(token)) return 3;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.change(postId,commentId,username,content.get("content"));

    }

}
