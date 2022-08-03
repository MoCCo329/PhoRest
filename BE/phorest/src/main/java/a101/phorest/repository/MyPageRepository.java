package a101.phorest.repository;

import a101.phorest.domain.MyPage;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface MyPageRepository extends JpaRepository<MyPage, Long> {




}