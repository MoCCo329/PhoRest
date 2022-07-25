package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    @Column(name="member_id")
    private Long id;

    private String username;

    private String password; // pw ????!?!

    private String phone;

    @OneToMany(mappedBy = "member")// Member - mypage 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. mypage가 주인장.
    private List<Mypage> mypages = new ArrayList<>();

    @OneToMany(mappedBy = "member")//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. comment가 주인장.
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. like가 주인장.
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member")//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. bookmark가 주인장.
    private List<Bookmark> bookmarks = new ArrayList<>();


}
