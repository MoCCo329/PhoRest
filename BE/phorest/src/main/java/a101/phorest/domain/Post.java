package a101.phorest.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;
    private String category; // photogroup, frame

    private LocalDateTime time; // time zz

    private String content;

    //@Basic(fetch=FetchType.LAZY)
    //@Formula("(select count(*) from postlike l where l.post_id = id)")
    private int likeCount;

    private Boolean isShared;

    //게시글 - 프레임 : 일 대 일, 게시글이 주인
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "frame_id")
    private Frame frame;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photogroup_id")
    private PhotoGroup photoGroup;

    @OneToMany(mappedBy = "post")// Post - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. mypage가 주인장.
    private List<MyPage> mypages = new ArrayList<>();

    @OneToMany(mappedBy = "post")//Post - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. comment가 주인장.
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post")//Post - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. like가 주인장.
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "post")//Post - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. bookmark가 주인장.
    private List<Bookmark> bookmarks = new ArrayList<>();


}
