package a101.phorest.repository;

import a101.phorest.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public void save(Member member){
        em.persist(member);
    }

    public void deleteById (Long id){
        em.createQuery("delete from Member m where m.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    public Member findOne(Long id){
        return em.find(Member.class,id);
    }

    public Optional<Member> findByUsername(String username){
        return em.createQuery("select m from Member m where m.username = :username", Member.class)
                .setParameter("username",username)
                .getResultList()
                .stream().findAny();
    }
}
