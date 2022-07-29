package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.File;

@Entity
@Getter
@Setter
public class PhotoGroup implements Images{

    @Id
    @GeneratedValue
    @Column(name="photo_group_id")
    private Long id;

    private Long humanCount;

    private String photoGroupPath;

    private String thumbNailPath;

    @OneToOne(mappedBy = "photoGroup", fetch = FetchType.LAZY)
    private Post post;

}
