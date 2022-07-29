package a101.phorest.repository;

import a101.phorest.domain.Mypage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyPageRepository extends JpaRepository<Mypage, Long> {

}