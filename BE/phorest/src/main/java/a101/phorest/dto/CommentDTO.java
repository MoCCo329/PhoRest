package a101.phorest.dto;

import a101.phorest.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {

    public CommentDTO(Comment comment){
        this.id = comment.getId();
        this.postId = comment.getPost().getId();
        this.username = comment.getUser().getUsername();
        this.nickname = comment.getUser().getNickname();
//        this.userId = comment.getUser().getUserId();
        this.content = comment.getContent();
        this.time = comment.getTime();
    }
    private Long id;
    private Long postId;
//    private Long userId;
    private String username;

    private String nickname;
    private String content;
    private LocalDateTime time;
}
