package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class PhotoGroup {

    @Id
    @GeneratedValue
    @Column(name="photogroup_id")
    private Long id;

    private Long humanCount;

    private String photoGroupPath;

    private String thumbNailPath;

    @OneToOne
    @JoinColumn(name = "frame_id")
    private Frame frame;


}
