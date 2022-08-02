//package a101.phorest.repository;

//import a101.phorest.domain.PhotoGroup;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//
//
//@Repository
//@RequiredArgsConstructor
//public class PhotoGroupRepository {
//
//    private final EntityManager em;
//
//    public void save(PhotoGroup photoGroup){
//        em.persist(photoGroup);
//    }
//
//    public PhotoGroup findOne(Long id){
//        return em.find(PhotoGroup.class,id);
//    }
//}
package a101.phorest.repository;

import a101.phorest.domain.PhotoGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoGroupRepository extends JpaRepository<PhotoGroup, Long> {

    Optional<PhotoGroup> findById(Long id);
}

