package a101.phorest.controller;

import a101.phorest.domain.Member;
import a101.phorest.repository.MemberRepository;
import a101.phorest.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    private final MemberService memberService;
    @Autowired
    private final MemberRepository memberRepository;

    @PostMapping("members/signup")
    @ResponseBody
    public Boolean create(@Valid MemberForm form, BindingResult result){ //BindingResult : 오류 발생시 오류가 result에 담겨서 아래가 실행됨.

        Member member = new Member();
        member.setUsername(form.getUsername());
        member.setNickname(form.getNickname());
        member.setPhone(form.getPhone());

        try{
            memberService.join(member);
        }catch(IllegalStateException e){
            return false;
        }

        if(result.hasErrors()){
            return false;
        }

        return true;
    }

    @PostMapping("members/login")
    @ResponseBody
    public String login(@Valid MemberForm form, BindingResult result) {
        //log.info("id : {} , pw : {}", inputEmail, inputPassword);

        String username = form.getUsername();
        String password = form.getPassword();
        Optional<Member> member = memberRepository.findByUsername(username);
        if(member.isPresent() && member.get().getPassword() == password){
            return "0";
        }
        else if(!member.isPresent()){
            return "1";
        }
        else if(member.get().getPassword() != password) {
            return "2";
        }
        return "3";
    }

//    @PostMapping("member/edit")
//    @ResponseBody
//    public String edit(@Valid MemberForm form, BindingResult result){
//        String username = form.getUsername();
//        String password = form.getPassword();
//        Optional<Member> member = memberRepository.findByUsername(username);
//    }
}
