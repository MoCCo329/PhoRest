package a101.phorest.controller;

import a101.phorest.dto.UserDTO;
import a101.phorest.service.KakaoService;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class KakaoController {
    public final KakaoService kaKaoService;
    public final UserService userService;

//    @GetMapping("send")
//    public int sendMsg(){
////        List<String> tokens = kaKaoService.getToken(code);
////
////        HashMap<String, String> userInfo = (HashMap<String, String>) kaKaoService.getUserInfo(tokens.get(0));
////
////        return ResponseEntity.ok(userService.setKakaoUser(userInfo,tokens)); //ResponseEntity<UserDTO>
//    }



}
