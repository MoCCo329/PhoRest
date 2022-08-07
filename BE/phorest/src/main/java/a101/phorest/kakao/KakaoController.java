package a101.phorest.kakao;

import a101.phorest.dto.LoginDTO;
import a101.phorest.dto.TokenDTO;
import a101.phorest.dto.UserDTO;
import a101.phorest.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class KakaoController {
    public final KakaoService kaKaoService;
    public final UserService userService;

//    @PostMapping("/kakao/login")
//    public String getCI(@RequestParam String code, Model model) throws IOException {
//        System.out.println("code = " + code);
//        String access_token = kaKaoService.getToken(code);
//        Map<String, String> userInfo = kaKaoService.getUserInfo(access_token);
//        model.addAttribute("code", code);
//        model.addAttribute("access_token", access_token);
//        model.addAttribute("userInfo", userInfo);
//
//        Logger logger = (Logger) LoggerFactory.getLogger("kakao-check");
//        logger.info(code);
//        logger.info(access_token);
//
//        userService.setKakaoUser((HashMap<String, String>) userInfo);
//
//
//        //ci는 비즈니스 전환후 검수신청 -> 허락받아야 수집 가능
//        return "index";
//    }
//
    //https://kauth.kakao.com/oauth/authorize?client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri=http://localhost:8399/api/user/kakao/login&response_type=code
    //@PostMapping("/kakao/login")
//@RequestMapping(value = "/kakao/login", method = RequestMethod.GET)
//public String login(@RequestParam("code") String code, HttpSession session) throws IOException {
//    String access_token = kaKaoService.getToken(code);
//    Logger logger = (Logger) LoggerFactory.getLogger("kakao-check");
//    logger.info(code);
//    logger.info(access_token);
//
//    HashMap<String, String> userInfo = (HashMap<String, String>) kaKaoService.getUserInfo(access_token);
//
//    //return ResponseEntity.ok(userService.setKakaoUser(userInfo));
//    ResponseEntity.ok(userService.setKakaoUser(userInfo)); //ResponseEntity<UserDTO>
//    return "redirect:/";
//
//}

@RequestMapping(value = "/kakao/login", method = RequestMethod.GET)
    public String login(@RequestParam("code") String code, HttpSession session) throws IOException {
        String access_token = kaKaoService.getToken(code);
        Logger logger = (Logger) LoggerFactory.getLogger("kakao-check");
        logger.info(code);
        logger.info(access_token);

        HashMap<String, String> userInfo = (HashMap<String, String>) kaKaoService.getUserInfo(access_token);

        String snsId = (String) userInfo.get("id") +"@k";
        String nickname = (String) userInfo.get("nickname");
        String phone = (String) userInfo.get("phone_number");
        String picture = (String) userInfo.get("picture");
        String userpw = snsId;

        UserDTO userDTO = new UserDTO();

        if(userService.findDtoUsernameOne(snsId) == null){
            userDTO.setUsername(snsId);
            userDTO.setPhone(phone);
            userDTO.setNickname(nickname);
            userDTO.setProfileURL(picture);
            userDTO.setPassword(userpw);
        }

        //return ResponseEntity.ok(userService.setKakaoUser(userInfo));
        ResponseEntity.ok(userService.setKakaoUser(userInfo)); //ResponseEntity<UserDTO>
        return "redirect:/";

    }
}
