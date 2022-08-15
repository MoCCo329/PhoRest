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

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
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
    public Long photoGroupUpload(@RequestPart("image") MultipartFile multipartFile, @RequestParam("humanCount") Long humanCount, @RequestParam("frameNum") Long frameId){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "photogroup");
        } catch (Exception e) {
            return -1L;
        }
        Long photogroup_id = photoGroupService.join(uploadUrl, humanCount, frameId);
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
        if(content.length() > 255) return -2L;
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

    @DeleteMapping("upload/profileimage")
    @ResponseBody
    public void deleteProfileImage(@RequestParam("image") String profileImageURL){

        s3Uploader.deleteFile(profileImageURL);
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
    public PostDTO sendPost(@PathVariable("postId") String postIdEncoded){
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Double decodedNumber = (Double.parseDouble(decodedString) + 37) / 73;
        Long postId = decodedNumber.longValue();
        if(postId - decodedNumber != 0)
            return new PostDTO();
        Optional<PostDTO> postDto = postService.findDtoOne(0L, postId, "");
        if(postDto.isEmpty())
            return new PostDTO();
        return postDto.get();
    }

    @PostMapping("upload/AR")
    @ResponseBody
    public Map<String, String> uploadAR(@RequestPart("file1") MultipartFile file1, @RequestPart("file2") MultipartFile file2, @RequestPart("file3") MultipartFile file3){
        String uploadUrl1;
        String uploadUrl2;
        String uploadUrl3;
        Map<String, String> urls = new HashMap<>();
        try {
            uploadUrl1 = s3Uploader.uploadFiles(file1, "AR");
            uploadUrl2 = s3Uploader.uploadFiles(file2, "AR");
            uploadUrl3 = s3Uploader.uploadFiles(file3, "AR");
        } catch (Exception e) {
            return new HashMap<String,String>();
        }
        urls.put("url1", uploadUrl1);
        urls.put("url2", uploadUrl2);
        urls.put("url3", uploadUrl3);
        return urls;
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
