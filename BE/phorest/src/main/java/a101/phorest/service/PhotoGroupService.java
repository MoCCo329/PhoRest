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
    EntityManager em;

    @Transactional
    public Long join(String uploadUrl, Long humancount){
        PhotoGroup photoGroup = new PhotoGroup();
        photoGroup.setPhotoGroupPath(uploadUrl);
        photoGroup.setHumanCount(humancount);
        photoGroup.setThumbNailPath(null);
        photoGroupRepository.save(photoGroup);
        return photoGroup.getId();
    }


    public PhotoGroup findOne(Long id){
        Optional<PhotoGroup> photoGroup = photoGroupRepository.findById(id);
        return photoGroup.get();
    }
}
