package a101.phorest.controller;

import a101.phorest.S3Uploader;
import a101.phorest.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class ImageController {

    @PostMapping("upload")
    @ResponseBody
    public String updateUserImage(@RequestBody MultipartFile multipartFile) {
        return "success";
    }

    private final S3Uploader s3Uploader;

    @PostMapping("upload/temp")
    public ResponseEntity updateUserImage2(@RequestParam("images") MultipartFile multipartFile) {
        try {
            String uploadUrl = s3Uploader.uploadFiles(multipartFile, "static");
            System.out.println(uploadUrl);
        } catch (Exception e) { return new ResponseEntity(HttpStatus.BAD_REQUEST); }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
