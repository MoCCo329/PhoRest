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

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)//여러개의 댓글에 하나의 post가 있다. 다대일. 주인은 post
    @JoinColumn(name = "member_id")
    private Post posts;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)//여러개의 댓글에 하나의 회원이 있다. 다대일. 주인은 회원.
    @JoinColumn(name = "member_id")
    private Member members;

    private String commentContent;

    private LocalDateTime commentTime;
}
