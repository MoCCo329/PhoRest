package a101.phorest.controller;

import a101.phorest.domain.Comment;
import a101.phorest.dto.CommentDto;
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
    public List<CommentDto> commentList(@PathVariable("postId") Long postId){
        return commentService.findComments(postId);
    }
    
    @PostMapping("{postId}/comment") // 댓글 생성
    public Boolean newComment(@PathVariable("postId") Long postId, @RequestHeader("Authorization") String token, @Valid @RequestBody Map<String, String> content) {
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.join(postId,username,content.get("content"));
    }

//
//    @PutMapping("{postId}/comment/{commentId}") // 댓글 수정
//    public Comment editComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @Valid @RequestBody CommentDto commentDto) {
//
//    }
    
    @DeleteMapping("{postId}/comment/{commentId}") //댓글 삭제
    public Boolean deleteComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token) {
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.remove(postId,commentId,username);
    }

}
