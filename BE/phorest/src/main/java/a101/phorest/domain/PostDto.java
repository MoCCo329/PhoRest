package a101.phorest.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

    public PostDto (Post post){
        this.id = post.getId();
        this.category = post.getCategory();
        if("photogroup".equals(this.category))
        {
            this.url = post.getPhotoGroup().getPhotoGroupPath();
            this.humanCount = post.getPhotoGroup().getHumanCount();
        }
        else if("frame".equals(this.category))
            this.url = post.getFrame().getFramePath();
        this.content = post.getContent();
        this.likeCount = post.getLikeCount();
        this.time = post.getTime();
    }

    private Long id;

    private String category;

    private String url;

    private String content;

    private Long humanCount;
    private int likeCount;

    private LocalDateTime time;
}
