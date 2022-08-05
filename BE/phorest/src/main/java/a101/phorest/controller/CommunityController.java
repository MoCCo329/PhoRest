package a101.phorest.controller;
import a101.phorest.dto.OffsetDTO;
import a101.phorest.dto.PostDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
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
    public List<PostDTO> photoGroupLikeDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByLikeCount("photogroup" ,offsetDto.getLimit(), offsetDto.getOffset(), offsetDto.getHumanCount());
    }

    @PostMapping("photogroup/recent")
    @ResponseBody
    public List<PostDTO> photoGroupRecentDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByRecent("photogroup" ,offsetDto.getLimit(), offsetDto.getOffset(), offsetDto.getHumanCount());
    }

    @PostMapping("frame/like")
    @ResponseBody
    public List<PostDTO> frameLikeDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByLikeCount("frame" ,offsetDto.getLimit(), offsetDto.getOffset(), 0L);
    }

    @PostMapping("frame/recent")
    @ResponseBody
    public List<PostDTO> FrameRecentDownload(@RequestBody OffsetDTO offsetDto)
    {
        return postService.findByRecent("frame" ,offsetDto.getLimit(), offsetDto.getOffset(), 0L);
    }

    @GetMapping("{postId}")
    public PostDTO getPost(@PathVariable("postId") Long postId, @RequestHeader(value = "Authorization", required = false) String token)
    {
        /*byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = (Long.parseLong(decodedString) + 37) / 73;*/
        Optional<PostDTO> postDto;
        if(token == null || token.equals(""))
        {
            postDto = postService.findDtoOne(1L, postId, "");
            return postDto.orElseGet(PostDTO::new);
        }
        if(!tokenProvider.validateToken(token))
            return new PostDTO();
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        postDto = postService.findDtoOne(1L, postId, username);
        return postDto.orElseGet(PostDTO::new);
    }

    @PutMapping("{postId}")
    public Long editPost(@PathVariable("postId") Long postId, @RequestBody PostDTO postDto, @RequestHeader(value = "Authorization") String token){
        /*byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = (Long.parseLong(decodedString) + 37) / 73;*/
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return postService.editPost(postId, username,postDto.getContent());
    }

    @DeleteMapping("{postId}")
    public Long deletePost(@PathVariable("postId") Long postId, @RequestHeader(value = "Authorization") String token){
        /*byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        Long postId = (Long.parseLong(decodedString) + 37) / 73;*/
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return postService.deletePost(postId, username);
    }
}
