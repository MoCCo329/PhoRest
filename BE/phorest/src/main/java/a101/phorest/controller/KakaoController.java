package a101.phorest.controller;

import a101.phorest.dto.UserDTO;
import a101.phorest.service.KakaoService;
import a101.phorest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class KakaoController {
    public final KakaoService kaKaoService;
    public final UserService userService;

    @RequestMapping(value = "/kakao/signup", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> signup(@RequestParam("code") String code, HttpSession session) throws IOException {
        String access_token = kaKaoService.getToken(code,"signup");
//        Logger logger = (Logger) LoggerFactory.getLogger("kakao-check");
//        logger.info(code);
//        logger.info(access_token);

        HashMap<String, String> userInfo = (HashMap<String, String>) kaKaoService.getUserInfo(access_token);

        return ResponseEntity.ok(userService.setKakaoUser(userInfo,access_token)); //ResponseEntity<UserDTO>

    }

    @RequestMapping(value = "/kakao/login", method = RequestMethod.GET)
    public ResponseEntity<Boolean> login(@RequestParam("code") String code, HttpSession session) throws IOException {
        String access_token = kaKaoService.getToken(code,"login");

        HashMap<String, String> userInfo = (HashMap<String, String>) kaKaoService.getUserInfo(access_token);
        String snsId = userInfo.get("id") + "@k";

        return ResponseEntity.ok(true);
    }
}
