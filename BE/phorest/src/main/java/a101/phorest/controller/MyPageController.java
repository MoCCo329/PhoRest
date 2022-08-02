package a101.phorest.controller;

import a101.phorest.domain.Post;
import a101.phorest.dto.PostDto;
import a101.phorest.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("api")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    @ResponseBody
    @GetMapping("mypage/{userId}")
    public List<PostDto> findByUserId(@PathVariable("userId") Long userId)
    {
        return myPageService.findByUserId(userId);
    }
}
