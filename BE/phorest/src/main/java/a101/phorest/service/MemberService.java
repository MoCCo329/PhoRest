package a101.phorest.service;

import a101.phorest.domain.Member;
import a101.phorest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

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

    public Member findOne(Long memberId){
        return memberRepository.findOne(memberId);
    }

    public Optional<Member> findMembers(Member member){
        return memberRepository.findByUsername(member.getUsername());
    }

}
