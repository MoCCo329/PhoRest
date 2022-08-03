package a101.phorest.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "postlike")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Like {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="like_id")
    private Long id;

    //Like- Post 다대일, 주인장 like
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //==비즈니스 로직==//
    /** likeCount 증가 */
    public void Like(){
        getPost().addLike();
    }
    /** likeCount 감소 */
    public void Unlike(){
        getPost().removeLike();
    }

}
