package a101.phorest.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
            this.human_count = post.getPhotoGroup().getHumanCount();
        }
        else if("frame".equals(this.category))
            this.url = post.getFrame().getFramePath();
        this.content = post.getContent();
        this.likeCount = post.getLikeCount();
    }

    private Long id;

    private String category;

    private String url;

    private String content;

    private Long human_count;
    private int likeCount;
}
