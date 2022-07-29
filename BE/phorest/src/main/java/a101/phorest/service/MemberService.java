package a101.phorest.service;

import a101.phorest.domain.Member;
import a101.phorest.domain.MemberDto;
import a101.phorest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    EntityManager em;

    @Transactional
    public String join(Member member){
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getUsername();
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> findMember = memberRepository.findByUsername(member.getUsername());
        if(findMember.isPresent()){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

//    @Transactional
//    void update(Member member) { //itemParam: 파리미터로 넘어온 준영속 상태의 엔티티
//        Member member = em.find(member.class, memberRepository.getId()); //같은 엔티티를 조회한
//                findItem.setPrice(itemParam.getPrice()); //데이터를 수정한다.
//    }

    public Member findOne(Long memberId){
        return memberRepository.findOne(memberId);
    }

    public Optional<MemberDto> findDtoUsernameOne(String username){
        Member member = memberRepository.findByUsername(username).get();
        MemberDto memberDto = new MemberDto();
        memberDto.setId(member.getId());
        memberDto.setNickname(member.getNickname());
        memberDto.setPassword(member.getPassword());
        memberDto.setPhone(member.getPhone());
        memberDto.setUsername(member.getUsername());
        return Optional.of(memberDto);
    }

    public Optional<Member> findByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    public Optional<Member> findMembers(Member member){
        return memberRepository.findByUsername(member.getUsername());
    }

}
