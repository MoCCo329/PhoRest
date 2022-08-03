package a101.phorest.controller;

import a101.phorest.domain.Frame;
import a101.phorest.dto.PostDto;
import a101.phorest.repository.FrameRepository;
import a101.phorest.service.FrameService;
import a101.phorest.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.awt.*;
import java.io.File;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class FrameController {

    PostService postService;


//    //Frame 생성
//    @PostMapping("frame/new")
//    @ResponseBody
//    public Long create(File image){
//        // 이미지 받음
//        Frame frame = new Frame();
//        frame.setFrameImage(image);
//        //frame.setThumbNailPath();
//        return frame.getId();
//    }

    //Frame 삭제

//    //frame 사진 보내주기
//    @PostMapping("frame/id")
//    @ResponseBody
//    public File getImage(@RequestBody @Valid Long id){
//        Frame frame = frameService.findOne(id);
//        return frame.getFrameImage();
//    }
}
