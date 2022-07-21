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

    private String nickname;

    private String phone;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "mypage_id") // mypage - member 일대일. 주인은 member?
    private Mypage mypages;

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. 멤버가 주인장.
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. 멤버가 주인장.
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)//Member - comments 하나의 멤버가 여러개의 댓글을 달을 수 있다. 일대다. 멤버가 주인장.
    private List<Bookmark> bookmarks = new ArrayList<>();


}
