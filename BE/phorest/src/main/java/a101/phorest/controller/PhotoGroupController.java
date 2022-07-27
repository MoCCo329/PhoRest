package a101.phorest.controller;

import a101.phorest.domain.PhotoGroup;
import a101.phorest.domain.Post;
import a101.phorest.service.PhotoGroupService;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PhotoGroupController {

    private final PhotoGroupService photoGroupService;

    private final PostService postService;

    @PostMapping("photogroup/upload")
    @ResponseBody
    public Long upload(File image){
        PhotoGroup photoGroup = new PhotoGroup();
        photoGroup.setPhotoGroupImage(image);
        photoGroup.setId(photoGroupService.join(photoGroup));

        Post post = new Post();
        post.setCategory("photogroup");
        post.setContent(null);
        return(postService.join(post));



    }
}
