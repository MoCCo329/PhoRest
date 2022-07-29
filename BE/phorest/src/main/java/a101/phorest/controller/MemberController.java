package a101.phorest.controller;

//import a101.phorest.config.JwtTokenProvider;
import a101.phorest.domain.Member;
import a101.phorest.repository.MemberRepository;
import a101.phorest.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public String create(@RequestBody @Valid MemberForm form, BindingResult result){ //BindingResult : 오류 발생시 오류가 result에 담겨서 아래가 실행됨.

        Member member = new Member();
        member.setPassword(form.getPassword());
        member.setUsername(form.getUsername());
        member.setNickname(form.getNickname());
        member.setPhone(form.getPhone());

        try{
            return memberService.join(member);
        }catch(IllegalStateException e){
            return "cannot join";
        }
    }
//// jenkins test
//    @PostMapping("member/login")
//    @ResponseBody
//    public String login(@RequestBody @Valid MemberForm form) {
//        //log.info("id : {} , pw : {}", inputEmail, inputPassword);
//
//        String username = form.getUsername();
//        String password = form.getPassword();
//        Optional<Member> member = memberRepository.findByUsername(username);
//        if(member.isPresent() && member.get().getPassword() == password){
//            //성공
//            //generate token
//            JwtTokenProvider jwtTokenProvider = null;
//            return  jwtTokenProvider.createToken(member.get().getId());
//            //출처: https://llshl.tistory.com/28 [하루에 딱 한 개만!!!:티스토리]
//        }
//        else if(!member.isPresent()){
//            return "no such id";
//        }
//        else if(member.get().getPassword() != password) {
//            return "wrong password";
//        }
//        return "unexpected error";
//    }
//
// 메인페이지 로그아웃

    @GetMapping("member/logout")
    @ResponseBody
    public String logout(HttpServletRequest request){

        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/";

    }

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
