package a101.phorest.controller;


import a101.phorest.S3Uploader;
import a101.phorest.domain.Frame;
import a101.phorest.domain.PhotoGroup;
import a101.phorest.domain.Post;
import a101.phorest.domain.PostDto;
import a101.phorest.service.FrameService;
import a101.phorest.service.PhotoGroupService;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

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
    public Long photoGroupUpload(@RequestPart("image") MultipartFile multipartFile, @RequestParam("human_count") Long humancount){
        String uploadUrl;
        try {
            uploadUrl = s3Uploader.uploadFiles(multipartFile, "photogroup");
        } catch (Exception e) {
            return -1L;
        }
        Long photogroup_id = photoGroupService.join(uploadUrl, humancount);
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
    public String frameDownload(@RequestParam("frame_id") String frame_id)
    {
        Long id = Long.parseLong(frame_id);
        Frame frame = frameService.findOne(id);
        return frame.getFramePath();
    }

    @GetMapping("download/frame")
    @ResponseBody
    public String PhotoGroupDownload(@RequestParam("photogroup_id") String photogroup_id)
    {
        Long id = Long.parseLong(photogroup_id);
        PhotoGroup photoGroup = photoGroupService.findOne(id);
        return photoGroup.getPhotoGroupPath();
    }


    @GetMapping("download/photogroup/like")
    @ResponseBody
    public List<PostDto> photoGroupLikeDownload(@RequestParam("limit") Long limit, @RequestParam("offset") Long offset)
    {
        return postService.findByLikeCount("photogroup" ,limit, offset);
    }

    @GetMapping("download/frame/like")
    @ResponseBody
    public List<PostDto> frameLikeDownload(@RequestParam("limit") Long limit, @RequestParam("offset") Long offset)
    {
        return postService.findByLikeCount("frame" ,limit, offset);
    }
}
