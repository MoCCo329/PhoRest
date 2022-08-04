package a101.phorest.controller;
import a101.phorest.dto.LoginDto;
import a101.phorest.dto.TokenDto;
import a101.phorest.dto.UserDto;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public final TokenProvider tokenProvider;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }

    @PostMapping("/member/signup")
    public ResponseEntity<UserDto> signup(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/member/login")
    public ResponseEntity<TokenDto> login(@Valid @RequestBody LoginDto loginDto){

        return ResponseEntity.ok(userService.login(loginDto));

    }
    @PostMapping("/member/logout")
    public Boolean logout(@RequestHeader("Authorization") String token){
        if(!tokenProvider.validateToken(token))
            //return "InvalidToken";
            return false;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        userService.logout(username);
        return true;
    }
    @GetMapping("/member/currentuser")
    public UserDto getCurrentUser(@RequestHeader("Authorization") String token)
    {
        if(!tokenProvider.validateToken(token))
            return new UserDto();
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return userService.findDtoUsernameOne(username).get();
    }

    @PutMapping("member/edit")
    public Long editUser(@RequestBody UserDto user, @RequestHeader("Authorization") String token)
    {
        if(!tokenProvider.validateToken(token))
            return 1L;
        String username = (String)tokenProvider.getTokenBody(token).get("sub");
        return userService.updateUser(user, username);

    }

}
