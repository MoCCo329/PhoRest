package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostDto {
    private Long id;

    private String category;

    private String url;

    private String content;

    private int likeCount;
}
