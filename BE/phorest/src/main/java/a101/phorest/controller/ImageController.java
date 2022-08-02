package a101.phorest.controller;


import a101.phorest.S3Uploader;
import a101.phorest.domain.Frame;
import a101.phorest.domain.PhotoGroup;
import a101.phorest.domain.Post;
import a101.phorest.domain.PostDto;
import a101.phorest.dto.UserDto;
import a101.phorest.repository.PostRepository;
import a101.phorest.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.time.LocalDateTime;
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

    private final UserService userService;

    private final MyPageService myPageService;

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
    public String frameDownload(@RequestParam("frame_id") Long frame_id)
    {
        Frame frame = frameService.findOne(frame_id);
        return frame.getFramePath();
    }

    @GetMapping("download/photogroup")
    @ResponseBody
    public String PhotoGroupDownload(@RequestParam("photogroup_id") Long photogroup_id)
    {
        PhotoGroup photoGroup = photoGroupService.findOne(photogroup_id);
        return photoGroup.getPhotoGroupPath();
    }


    @GetMapping ("download/photogroup/like")
    @ResponseBody
    public List<PostDto> photoGroupLikeDownload(@RequestParam("limit") Long limit, @RequestParam("offset") Long offset, @RequestParam("human_count") Long humancount)
    {
        return postService.findByLikeCount("photogroup" ,limit, offset, humancount);
    }

    @GetMapping("download/frame/like")
    @ResponseBody
    public List<PostDto> frameLikeDownload(@RequestParam("limit") Long limit, @RequestParam("offset") Long offset)
    {
        return postService.findByLikeCount("frame" ,limit, offset, 0L);
    }

    @GetMapping("download/{post_id}")
    @ResponseBody
    public PostDto SendPost(@PathVariable("post_id") Long id){
        Optional<PostDto> postDto = postService.findDtoOne(id);
        if(postDto.isEmpty())
            return new PostDto();
        return postDto.get();
    }

    @GetMapping("download/{post_id}/add")
    @ResponseBody
    public boolean addPost(@PathVariable("post_id") Long post_id, @RequestParam("username") String username){
        Optional<UserDto> user = userService.findDtoUsernameOne(username);
        Optional<PostDto> post = postService.findDtoOne(post_id);
        if(user.isEmpty() || post.isEmpty())
            return false;
        myPageService.join(user.get(), post.get());
        return true;
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
