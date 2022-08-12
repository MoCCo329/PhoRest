package a101.phorest.controller;

import a101.phorest.dto.FollowDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.FollowRepository;
import a101.phorest.repository.UserRepository;
import a101.phorest.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.ValidationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class FollowingController {

    public final TokenProvider tokenProvider;
    public final FollowService followService;
    public final FollowRepository followRepository;
    public final UserRepository userRepository;

    @GetMapping("following")
    public List<FollowDTO> getFollowings(@RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            throw new ValidationException("Invalid Token");
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return followService.getFollowingsof(username);
    }

    @PostMapping("follower")
    public List<FollowDTO> getFollower(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> input){
        if(!tokenProvider.validateToken(token))
            throw new ValidationException("Invalid Token");
        String username = input.get("username");
        return followService.getFollowerof(username);
    }

    @PostMapping("{username}/follow")
    @ResponseBody
    public int addFollow(@PathVariable("username") String other_username, @RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            //return "InvalidToken";
            return 2;

        String my_username = (String)tokenProvider.getTokenBody(token).get("sub");

        Long my_id=userRepository.findByUsername(my_username).getUserId();
        Long other_id=userRepository.findByUsername(other_username).getUserId();

        if(my_id.equals(other_id)) return 3;

        if(followRepository.findByFollowerAndFollowing(other_id,my_id).isEmpty()) {
            followService.join(other_id,my_id);
            return 1;
        }
        else{
            followService.remove(other_id,my_id);
            return 0;
        }
    }


}
