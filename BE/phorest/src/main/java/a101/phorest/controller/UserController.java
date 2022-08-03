package a101.phorest.controller;

import a101.phorest.config.SecurityConfig;
import a101.phorest.domain.User;
import a101.phorest.dto.LoginDto;
import a101.phorest.dto.TokenDto;
import a101.phorest.dto.UserDto;
import a101.phorest.jwt.JwtFilter;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.service.UserService;
import antlr.Token;
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
public class UserController {
    private final UserService userService;
//    private final TokenProvider tokenProvider;
//    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService
                          //,TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder
    ) {
        this.userService = userService;
//        this.tokenProvider = tokenProvider;
//        this.authenticationManagerBuilder = authenticationManagerBuilder;

    }

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

//    @PostMapping("/login")
//    public UserDto login(@RequestBody Map<String, String> form) throws IllegalAccessException {
//        String username = form.get("username");
//        String password = form.get("password");
////        System.out.println(username);
////        System.out.println(password);
//
//        UserDto userDto = userService.getUserWithAuthorities(username);
//
//        if(!passwordEncoder.matches( password ,userDto.getPassword())){
//            throw new IllegalAccessException("Wrong Password");
//        }
//
//        userDto.setPassword("");
//        return userDto;
//    }
//
//    @GetMapping("/user")
//    //@PreAuthorize("hasAnyRole('USER','ADMIN')")
//    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
//        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
//    }
//
//    @GetMapping("/user/{username}")
//    //@PreAuthorize("hasAnyRole('ADMIN')")
//    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
//    }
}
