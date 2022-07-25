package a101.phorest.controller;

import a101.phorest.domain.Member;
import a101.phorest.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("members/signup")
    @ResponseBody
    public Boolean create(@Valid MemberForm form, BindingResult result){ //BindingResult : 오류 발생시 오류가 result에 담겨서 아래가 실행됨.


        Member member = new Member();
        member.setUsername(form.getUsername());
        member.setPhone(form.getPhone());

        try{
            memberService.join(member);
        }catch(IllegalStateException e){
            return false;
        }

        if(result.hasErrors()){
            return false;
        }

        return true; // 첫번째 페이지로 넘어감
    }
}
