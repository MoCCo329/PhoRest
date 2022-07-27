package a101.phorest.controller;

import a101.phorest.domain.Frame;
import a101.phorest.repository.FrameRepository;
import a101.phorest.service.FrameService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.awt.*;
import java.io.File;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/")
public class FrameController {

    @Autowired
    private final FrameService frameService;

    @Autowired
    private final FrameRepository frameRepository;

    //Frame 생성
    @PostMapping("frame/new")
    @ResponseBody
    public Long create(File image){
        // 이미지 받음
        Frame frame = new Frame();
        frame.setFrameImage(image);
        //frame.setThumbNailPath();
        return frame.getId();
    }

    //Frame 삭제

    //frame 사진 보내주기
    @PostMapping("frame/id")
    @ResponseBody
    public File getImage(@RequestBody @Valid Long id){
        Frame frame = frameService.findOne(id);
        return frame.getFrameImage();
    }
}
