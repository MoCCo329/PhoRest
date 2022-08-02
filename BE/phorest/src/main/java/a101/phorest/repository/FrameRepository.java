package a101.phorest.repository;

import a101.phorest.domain.Frame;
import a101.phorest.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
public interface FrameRepository extends JpaRepository<Frame, Long> {
    /**frame 삭제
    public void deleteById (Long id){
        em.createQuery("delete from Frame f where f.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
     */

    Optional<Frame> findById(Long id);
}
