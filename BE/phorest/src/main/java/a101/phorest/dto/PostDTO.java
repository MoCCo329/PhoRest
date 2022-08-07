package a101.phorest.dto;

import a101.phorest.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {

    public PostDTO(Post post, List<UserDTO> users){
        this.id = post.getId();
        this.category = post.getCategory();
        if("photogroup".equals(this.category))
        {
            this.url = post.getPhotoGroup().getPhotoGroupPath();
            this.humanCount = post.getPhotoGroup().getHumanCount();
            this.photogroupId = post.getPhotoGroup().getId();
            this.videoURL = post.getPhotoGroup().getVideoPath();
        }
        else if("frame".equals(this.category))
        {
            this.url = post.getFrame().getFramePath();
            this.frameId = post.getFrame().getId();
        }
        this.content = post.getContent();
        this.likeCount = post.getLikeCount();
        this.time = post.getTime();
        if(!users.isEmpty())
            this.users = users;
    }

    private Long id;

    private String category;

    private String url;


    private String content;

    private Long humanCount;
    private int likeCount;

    private LocalDateTime time;

    private Long photogroupId;

    private String videoURL;
    private Long frameId;

    private Boolean isLike;

    private Boolean isBookmark;

    private Boolean isWriter;
    
    private List<UserDTO> users;
}
