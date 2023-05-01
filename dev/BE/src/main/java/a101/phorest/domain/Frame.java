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
public class Frame implements Images{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "frame_id")
    private Long id;

    private String framePath;

    @OneToOne(mappedBy = "frame", fetch = FetchType.LAZY)
    private Post post;

}
