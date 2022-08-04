package a101.phorest.controller;

import a101.phorest.config.SecurityConfig;
import a101.phorest.domain.User;
import a101.phorest.dto.LoginDto;
import a101.phorest.dto.TokenDto;
import a101.phorest.dto.UserDto;
import a101.phorest.jwt.JwtFilter;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.LikeRepository;
import a101.phorest.service.UserService;
import antlr.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;

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
}
