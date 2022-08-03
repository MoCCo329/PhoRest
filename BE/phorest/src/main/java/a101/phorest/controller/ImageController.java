package a101.phorest.controller;


import a101.phorest.S3Uploader;
import a101.phorest.domain.Frame;
import a101.phorest.domain.PhotoGroup;
import a101.phorest.dto.PostDto;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class ImageController {

    private final PhotoGroupService photoGroupService;

    private final FrameService frameService;

    private final PostService postService;

    private final S3Uploader s3Uploader;

    private final TokenProvider tokenProvider;

    @PostMapping("upload/photogroup")
    @ResponseBody
    public Long photoGroupUpload(@RequestPart("image") MultipartFile multipartFile, @RequestParam("humanCount") Long humanCount){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "photogroup");
        } catch (Exception e) {
            return -1L;
        }
        Long photogroup_id = photoGroupService.join(uploadUrl, humanCount);
        return postService.join(photoGroupService.findOne(photogroup_id), "photogroup", "none");
    }


    @PostMapping("upload/frame")
    @ResponseBody
    public Long frameUpload(@RequestPart("image") MultipartFile multipartFile, String content){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "frame");
        } catch (Exception e) {
            return -1L;
        }
        Long frame_id = frameService.join(uploadUrl);
        return(postService.join(frameService.findOne(frame_id), "frame", content));
    }

    @GetMapping("download/frame")
    @ResponseBody
    public String frameDownload(@RequestParam("frameId") Long frameId)
    {
        Frame frame = frameService.findOne(frameId);
        return frame.getFramePath();
    }

    @GetMapping("download/photogroup")
    @ResponseBody
    public String photoGroupDownload(@RequestParam("photogroupId") Long photogroupId)
    {
        PhotoGroup photoGroup = photoGroupService.findOne(photogroupId);
        return photoGroup.getPhotoGroupPath();
    }



    @GetMapping("download/{postId}")
    @ResponseBody
    public PostDto sendPost(@PathVariable("postId") Long id){

        Optional<PostDto> postDto = postService.findDtoOne(id, "");
        if(postDto.isEmpty())
            return new PostDto();
        return postDto.get();
    }



//    //post 새로 만들기 + postid 보내주기
//    @PostMapping("post/new")
//    @ResponseBody
//    public Long create(String category,String content){
//        Post post = new Post();
//
//        post.setCategory(category);
//        post.setTime(LocalDateTime.now());
//        post.setContent(content);
//        post.setLikeCount(0);
//
//        post.setId(postService.join(post));
//
//        return post.getId();
//    }

}
