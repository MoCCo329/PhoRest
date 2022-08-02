package a101.phorest.repository;

import a101.phorest.domain.Frame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class FrameRepository {

    private final EntityManager em;

    public void save(Frame frame){
        em.persist(frame);
    }

    /**frame 삭제
    public void deleteById (Long id){
        em.createQuery("delete from Frame f where f.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
     */

    public Frame findOne(Long id){
        return em.find(Frame.class,id);
    }
}
