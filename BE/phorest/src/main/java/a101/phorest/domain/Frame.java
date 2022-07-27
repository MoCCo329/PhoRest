package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.awt.*;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "frame")
    private List<PhotoGroup> photoGroups = new ArrayList<>();
}
