package a101.phorest.controller;
import a101.phorest.dto.OffsetDTO;
import a101.phorest.dto.PostDto;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/community")
public class CommunityController {

    private final PostService postService;

    private final TokenProvider tokenProvider;

    @PostMapping("photogroup/like")
    @ResponseBody
    public List<PostDto> photoGroupLikeDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByLikeCount("photogroup" ,offsetDto.getLimit(), offsetDto.getOffset(), offsetDto.getHumanCount());
    }

    @PostMapping("photogroup/recent")
    @ResponseBody
    public List<PostDto> photoGroupRecentDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByRecent("photogroup" ,offsetDto.getLimit(), offsetDto.getOffset(), offsetDto.getHumanCount());
    }

    @PostMapping("frame/like")
    @ResponseBody
    public List<PostDto> frameLikeDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByLikeCount("frame" ,offsetDto.getLimit(), offsetDto.getOffset(), 0L);
    }

    @PostMapping("frame/recent")
    @ResponseBody
    public List<PostDto> FrameRecentDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByRecent("frame" ,offsetDto.getLimit(), offsetDto.getOffset(), 0L);
    }

    @GetMapping("{postId}")
    public PostDto getPost(@PathVariable("postId") Long postId, @RequestHeader(value = "Authorization", required = false) String token)
    {
        Optional<PostDto> postDto;
        if(token == null)
        {
            postDto = postService.findDtoOne(postId, "");
            return postDto.orElseGet(PostDto::new);
        }
        if(!tokenProvider.validateToken(token))
            return new PostDto();
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        postDto = postService.findDtoOne(postId, username);
        return postDto.orElseGet(PostDto::new);
    }

    @PutMapping("{postId}")
    public Long editPost(@PathVariable("postId") Long postId,@RequestBody PostDto postDto, @RequestHeader(value = "Authorization") String token){
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return postService.editPost(postId, username,postDto.getContent());
    }

    @DeleteMapping("{postId}")
    public Long deletePost(@PathVariable("postId") Long postId, @RequestHeader(value = "Authorization") String token){
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return postService.deletePost(postId, username);
    }
}
