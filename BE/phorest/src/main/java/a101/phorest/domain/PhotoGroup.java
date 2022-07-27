package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.File;

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

    @ManyToOne
    @JoinColumn(name = "frame_id")
    private Frame frame;


}
