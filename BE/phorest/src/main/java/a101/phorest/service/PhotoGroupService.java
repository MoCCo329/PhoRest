package a101.phorest.service;

import a101.phorest.domain.PhotoGroup;
import a101.phorest.repository.PhotoGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PhotoGroupService {

    private final PhotoGroupRepository photoGroupRepository;
    EntityManager em;

    @Transactional
    public Long join(PhotoGroup photoGroup){
        photoGroupRepository.save(photoGroup);
        return photoGroup.getId();
    }
}
