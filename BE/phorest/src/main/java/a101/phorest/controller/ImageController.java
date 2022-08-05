package a101.phorest.controller;


import a101.phorest.S3Uploader;
import a101.phorest.domain.Frame;
import a101.phorest.domain.PhotoGroup;
import a101.phorest.dto.PostDTO;
import a101.phorest.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class ImageController {

    private final PhotoGroupService photoGroupService;

    private final FrameService frameService;

    private final PostService postService;

    private final S3Uploader s3Uploader;


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
        return(postService.join(frameService.findOne(frame_id).get(), "frame", content));
    }

    @PostMapping("upload/video")
    @ResponseBody
    public Boolean videoUpload(@RequestPart("video") MultipartFile multipartFile, @RequestParam("postId") Long postId){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "video");
        } catch (Exception e) {
            return false;
        }
        Long photoGroup_id = postService.findOne(postId).get().getPhotoGroup().getId();
        photoGroupService.updateVideoUrl(photoGroup_id, uploadUrl);
        return true;
    }

    @PostMapping("upload/profileimage")
    @ResponseBody
    public String profileUrlUpload(@RequestPart("image") MultipartFile multipartFile){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "profileimage");
        } catch (Exception e) {
            return "fail";
        }
        return uploadUrl;
    }

    @PostMapping("download/frame")
    @ResponseBody
    public String frameDownload(@RequestParam("frameId") Long frameId)
    {
        Optional<Frame> frame = frameService.findOne(frameId);
        if(frame.isEmpty())
            return "fail";
        return frame.get().getFramePath();
    }

    @PostMapping("download/photogroup")
    @ResponseBody
    public String photoGroupDownload(@RequestParam("photogroupId") Long photogroupId)
    {
        PhotoGroup photoGroup = photoGroupService.findOne(photogroupId);
        if(photoGroup == null)
            return "";
        return photoGroup.getPhotoGroupPath();
    }


    @PostMapping("download/video")
    @ResponseBody
    public String videoDownload(@RequestParam("postId") Long postId)
    {
        Long photogroupId = postService.findOne(postId).get().getPhotoGroup().getId();
        return photoGroupService.findOne(photogroupId).getVideoPath();
    }

    @GetMapping("download/{postId}")
    @ResponseBody
    public PostDTO sendPost(@PathVariable("postId") Long id){

        Optional<PostDTO> postDto = postService.findDtoOne(0L, id, "");
        if(postDto.isEmpty())
            return new PostDTO();
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
