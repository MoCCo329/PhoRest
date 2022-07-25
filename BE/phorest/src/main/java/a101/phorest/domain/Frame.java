package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
public class Frame {
    @Id @GeneratedValue
    @Column(name = "frame_id")
    private Long id;

    private String thumbNailPath;

    private String framePath;

    @OneToOne(mappedBy = "frame", fetch = FetchType.LAZY)
    private Post post;

    @OneToOne(mappedBy = "frame", fetch = FetchType.LAZY)
    private PhotoGroup photoGroup;
}
