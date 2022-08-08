package a101.phorest.controller;
import a101.phorest.dto.LoginDTO;
import a101.phorest.dto.TokenDTO;
import a101.phorest.dto.UserDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.FollowService;
import a101.phorest.service.KakaoService;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public final TokenProvider tokenProvider;

    public final KakaoService kakaoService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }

    @PostMapping("/user/signup")
    public ResponseEntity<UserDTO> signup(@Valid @RequestBody UserDTO userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/user/login")
    public ResponseEntity<TokenDTO> login(@Valid @RequestBody LoginDTO loginDto){

        return ResponseEntity.ok(userService.login(loginDto));

    }
    @PostMapping("/user/logout")
    public Boolean logout(@RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            //return "InvalidToken";
            return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        userService.logout(username);
        return true;
    }
    @GetMapping("/user/currentuser")
    public UserDTO getCurrentUser(@RequestHeader(value = "Authorization", required = false) String token)
    {
        if(token == null || token.equals(""))
            return new UserDTO();
        if(!tokenProvider.validateToken(token))
            return new UserDTO();
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return userService.findDtoUsernameOne(username).get();
    }

    @PutMapping("user/edit")
    public Long editUser(@RequestBody @Valid UserDTO user, @RequestHeader("Authorization") String token)
    {
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return userService.updateUser(user, username);

    }
    @RequestMapping(value = "user/kakao", method = RequestMethod.GET)
    public TokenDTO kakaoLogin(@RequestParam("code") String code) throws IOException {
        List<String> tokens = kakaoService.getToken(code);
        String access_token=tokens.get(0);
        HashMap<String, String> userInfo = (HashMap<String, String>) kakaoService.getUserInfo(access_token);
        return userService.setKakaoUser(userInfo, tokens);
    }
}
