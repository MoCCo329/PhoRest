package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Comment {
    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)//여러개의 댓글에 하나의 post가 있다. 다대일. 주인은 comment
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)//여러개의 댓글에 하나의 회원이 있다. 다대일. 주인은 commet.
    @JoinColumn(name = "member_id")
    private Member member;

    private String commentContent;

    private LocalDateTime commentTime;
}
