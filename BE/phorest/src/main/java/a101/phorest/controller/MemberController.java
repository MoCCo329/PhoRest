package a101.phorest.controller;

import a101.phorest.domain.Member;
import a101.phorest.repository.MemberRepository;
import a101.phorest.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("api")
public class MemberController {

    @Autowired
    private final MemberService memberService;
    @Autowired
    private final MemberRepository memberRepository;

    @PostMapping("member/signup")
    @ResponseBody
    public Boolean create(@RequestBody @Valid MemberForm form, BindingResult result){ //BindingResult : 오류 발생시 오류가 result에 담겨서 아래가 실행됨.

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
// jenkins test
    @PostMapping("member/login")
    @ResponseBody
    public String login(@RequestBody @Valid MemberForm form) {
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

    /**logout은 백에서 할 일 없음*/
//    @PostMapping("member/logout")
//    @ResponseBody
    /* 메인페이지 로그아웃 */
//    @GetMapping("member/logout")
//    @ResponseBody
//    public String logout(HttpServletRequest request) throws Exception{
//
//        logger.info("logoutMainGET메서드 진입");
//        HttpSession session = request.getSession();
//        session.invalidate();
//        return "redirect:/main";
//
//    }

    @PutMapping("member/edit")
    @ResponseBody
    public String edit(@RequestBody @Valid MemberForm form, BindingResult result){
        String username = form.getUsername();

        String password = form.getPassword();
        String phone = form.getPhone();
        //닉네임은 일단 못바꾸게함 => 바꿀수 있게 할라면 또 중복검사 해야됨,, 나중에 만들쟈
        
        Optional<Member> member = memberRepository.findByUsername(username);
        member.get().setPassword(password);
        member.get().setPhone(phone);

        return "0";
    }
}
