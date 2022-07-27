package a101.phorest.controller;

import a101.phorest.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class ImageController {

    @PostMapping("upload/{frameId}")
    @ResponseBody
    public String updateUserImage(@RequestBody MultipartFile multipartFile) {
        return "success";
    }
}
