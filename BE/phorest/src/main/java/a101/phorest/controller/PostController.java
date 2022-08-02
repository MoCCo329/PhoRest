package a101.phorest.controller;

import a101.phorest.domain.*;
import a101.phorest.dto.UserDto;
import a101.phorest.service.MyPageService;
import a101.phorest.service.PostService;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    private final MyPageService myPageService;
}
