package a101.phorest.service;

import a101.phorest.domain.PhotoGroup;
import a101.phorest.repository.PhotoGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PhotoGroupService {

    private final PhotoGroupRepository photoGroupRepository;

    @Transactional
    public Long join(String uploadUrl, Long humanCount){
        PhotoGroup photoGroup = new PhotoGroup();
        photoGroup.setPhotoGroupPath(uploadUrl);
        photoGroup.setHumanCount(humanCount);
        photoGroup.setVideoPath(null);
        photoGroupRepository.save(photoGroup);
        return photoGroup.getId();
    }
    @Transactional
    public Long updateVideoUrl(Long photogroupId, String Url){
        PhotoGroup photoGroup = photoGroupRepository.findById(photogroupId).get();
        photoGroup.setVideoPath(Url);
        return photogroupId;
    }

    public PhotoGroup findOne(Long id){
        Optional<PhotoGroup> photoGroup = photoGroupRepository.findById(id);
        return photoGroup.get();
    }
}
