package a101.phorest.service;

import a101.phorest.domain.Frame;
import a101.phorest.domain.Post;
import a101.phorest.repository.FrameRepository;
import a101.phorest.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class FrameService {

    private final FrameRepository frameRepository;


    @Transactional
    public Long join(String path){
        Frame frame = new Frame();
        frame.setFramePath(path);
        frameRepository.save(frame);
        return frame.getId();
    }

    public Frame findOne(Long frameId){
        return frameRepository.findById(frameId).get();
    }
}
