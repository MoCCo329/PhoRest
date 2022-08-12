package a101.phorest.controller;

import a101.phorest.dto.CommentDTO;
import a101.phorest.dto.PostDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
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
        Double decodedNumber = (Double.parseDouble(decodedString) - 37) / 73;
        Long postId = decodedNumber.longValue();
        if(postId - decodedNumber != 0)
            return new ArrayList<>();
        return commentService.findComments(postId);
    }
    
    @PostMapping("{postId}/comment") // 댓글 생성
    public Long newComment(@PathVariable("postId") String postIdEncoded, @RequestHeader("Authorization") String token, @Valid @RequestBody Map<String, String> content) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Double decodedNumber = (Double.parseDouble(decodedString) - 37) / 73;
        Long postId = decodedNumber.longValue();
        String ct = content.get("content");
        if(ct.length() > 255) return 6L;
        if(ct.trim().isEmpty()) return 5L;
        if(postId - decodedNumber != 0)
            return 4L;
        if(!tokenProvider.validateToken(token)) return 3L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.join(postId,username,ct);
    }
    
    @DeleteMapping("{postId}/comment/{commentId}") //댓글 삭제
    public Boolean deleteComment(@PathVariable("postId") String postIdEncoded, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Double decodedNumber = (Double.parseDouble(decodedString) - 37) / 73;
        Long postId = decodedNumber.longValue();
        if(postId - decodedNumber != 0)
            return false;
        if(!tokenProvider.validateToken(token)) return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.remove(postId,commentId,username);
    }

    @PutMapping("{postId}/comment/{commentId}") // 댓글 수정
    public int editComment(@PathVariable("postId") String postIdEncoded, @PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String token,@Valid @RequestBody Map<String, String> content) {
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Double decodedNumber = (Double.parseDouble(decodedString) - 37) / 73;
        Long postId = decodedNumber.longValue();
        String ct = content.get("content");
        if(ct.length() > 255) return 6;
        if(ct.trim().isEmpty()) return 5;
        if(postId - decodedNumber != 0)
            return 4;
        //수정완료 0 수정못함 1
        if(!tokenProvider.validateToken(token)) return 3;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        return commentService.change(postId,commentId,username,ct);

    }

}
