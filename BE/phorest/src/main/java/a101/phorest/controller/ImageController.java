package a101.phorest.controller;


import a101.phorest.S3Uploader;
import a101.phorest.domain.Post;
import a101.phorest.service.FrameService;
import a101.phorest.service.PhotoGroupService;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class ImageController {



    private final PhotoGroupService photoGroupService;

    private final FrameService frameService;

    private final PostService postService;

    private final S3Uploader s3Uploader;
    //test
    @PostMapping("upload")
    @ResponseBody
    public String updateUserImage(@RequestParam("images") MultipartFile multipartFile) {
        return "success";
    }



    @PostMapping("upload/temp")
    public ResponseEntity updateUserImage2(@RequestParam("images") MultipartFile multipartFile) {
        try {
            String uploadUrl = s3Uploader.uploadFiles(multipartFile, "static");
            System.out.println(uploadUrl);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    @PostMapping("upload/photogroup")
    @ResponseBody
    public Long photoGroupUpload(@RequestBody String path){
        Long id = photoGroupService.join(path);

        Post post = new Post();
        post.setCategory("photogroup");
        post.setContent(null);
        post.setPhotoGroup(photoGroupService.findOne(id));
        return(postService.join(post));

    }

    @PostMapping("upload/frame")
    @ResponseBody
    public Long frameUpload(@RequestBody String path, String content){
        Long id = frameService.join(path);

        Post post = new Post();
        post.setCategory("frame");
        post.setContent(content);
        post.setFrame(frameService.findOne(id));
        return(postService.join(post));


    }
}
