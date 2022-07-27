package a101.phorest.service;

import a101.phorest.domain.Member;
import a101.phorest.domain.PhotoGroup;
import a101.phorest.repository.PhotoGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PhotoGroupService {

    private final PhotoGroupRepository photoGroupRepository;
    EntityManager em;

    public Long join(String path){
        PhotoGroup photoGroup = new PhotoGroup();
        photoGroup.setPhotoGroupPath(path);
        photoGroupRepository.save(photoGroup);
        return photoGroup.getId();
    }


    public PhotoGroup findOne(Long id){
        return photoGroupRepository.findOne(id);
    }
}
