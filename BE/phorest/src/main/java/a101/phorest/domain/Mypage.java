package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Mypage {
    @Id
    @GeneratedValue
    @Column(name = "mypage_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)//마이페이지와 회원은 일대일 관계, 회원이 주인.
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)//하나의 마이페이지에 여러개의 게시글이 있을 수 있다. 일대다. 주인은 게시글. mappedby 사용하기
    private List<Post> posts = new ArrayList<>();

}
