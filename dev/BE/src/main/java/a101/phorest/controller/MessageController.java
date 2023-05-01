package a101.phorest.controller;

import a101.phorest.domain.User;
import a101.phorest.dto.KakaoDTO;
import a101.phorest.dto.PostDTO;
import a101.phorest.dto.UserDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.MyPageRepository;
import a101.phorest.service.*;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.util.*;


@RestController
@Component
@RequiredArgsConstructor
@RequestMapping("api")
public class MessageController {

    private final DefaultMessageService messageService;
    private final PostService postService;

    public final TokenProvider tokenProvider;

    public final UserService userService;
    private final KakaoService kakaoService;
    private final PhotoGroupService photoGroupService;
    private final MyPageService myPageService;
    private final MyPageRepository myPageRepository;

    @PostMapping("download/{postId}/message")
    public Long message(@PathVariable("postId") String postIdEncoded, @RequestHeader("Authorization") String token, @Valid @RequestBody Map<String, String> content){
        byte[] decodedBytes = Base64.getDecoder().decode(postIdEncoded);
        String decodedString = new String(decodedBytes);
        if(!decodedString.matches("[+-]?\\d*(\\.\\d+)?")) return 5L;
        Double decodedNumber = (Double.parseDouble(decodedString) + 37) / 73;
        Long postId = decodedNumber.longValue();

        String ct = content.get("content");
        String username = (String)tokenProvider.getTokenBody(token).get("sub");

        if(postId - decodedNumber != 0)
            return 5L; //존재하지 않는 post id
        if(!tokenProvider.validateToken(token))
            return 2L; //
        if(ct.length() > 100) return 6L; // 너무 길때
        if(ct.trim().isEmpty()) return 7L; // 아무글자도 없을때
        return myPageService.setMessageMyself(postId,username,ct);
    }

//    @Scheduled(cron = "0 0 10 * * *")
    @PostMapping("sendkakao")
    public String sendMsg() throws Exception {
        List<PostDTO> postDTOS = postService.findMessagePosts();

        for(PostDTO postDTO : postDTOS){
            long postId = postDTO.getId() * 73 + 37;
            String encodedPostId = Base64.getEncoder().encodeToString(Long.toString(postId).getBytes());
            for(UserDTO userDTO : postDTO.getUsers()){
                if(userDTO.isKakao()){
                    String refresh_token = userDTO.getRefresh_token();
                    String accessToken = kakaoService.getAccessToken(refresh_token);
//                    String accessToken = userDTO.getAccess_token();
                    String path = photoGroupService.findOne(postDTO.getPhotogroupId()).getPhotoGroupPath();
                    String content = myPageService.getMessageByPostIdAndUsername(postDTO.getId(), userDTO.getUsername());
                    KakaoDTO kakaoDTO = new KakaoDTO();
                    kakaoDTO.setPath(path);
                    kakaoDTO.setAccessToken(accessToken);
                    kakaoDTO.setEncodedPostId(encodedPostId);
                    kakaoService.sendMessage(kakaoDTO,content);

//                    kakaoDTOList.add(kakaoDTO);
                }
            }

        }
        return "success";
    }

    //@Scheduled(cron = "0 0 9 * * ?")
    public void sendMessages() throws MalformedURLException, IOException {
        List<Message> messageList = new ArrayList<>();
        List<PostDTO> postDTOS = postService.findMessagePosts();
        for(PostDTO postDTO : postDTOS){
            long postId = postDTO.getId() * 73 + 37;
            String encodedPostId = Base64.getEncoder().encodeToString(Long.toString(postId).getBytes());
            for(UserDTO userDTO : postDTO.getUsers()){
                if(userDTO.getPhone() == null)
                    continue;
//                File f = new File(System.getProperty("user.dir") + "/imagefiles/tempfiles/" + userDTO.getPhone());
//                FileUtils.copyURLToFile(new URL(postDTO.getUrl()), f);
//                String imageId = this.messageService.uploadFile(f, StorageType.MMS, null);
//                f.delete();
                Message message = new Message();
                // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
                message.setFrom("01040563512");
                message.setTo(userDTO.getPhone());
                message.setText("일주일 전 찍었던 사진을 확인해 보세요\n" + "phorest.site/community/" + encodedPostId);
//                message.setImageId(imageId);
                messageList.add(message);
            }
        }
        try {
            // send 메소드로 단일 Message 객체를 넣어도 동작합니다!
            MultipleDetailMessageSentResponse response = this.messageService.send(messageList);

            // 중복 수신번호를 허용하고 싶으실 경우 위 코드 대신 아래코드로 대체해 사용해보세요!
            //MultipleDetailMessageSentResponse response = this.messageService.send(messageList, true);
            System.out.println(response);
        } catch (NurigoMessageNotReceivedException exception) {
            System.out.println(exception.getFailedMessageList());
            System.out.println(exception.getMessage());
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }
    @PostMapping("api/user/sendsms")
    @ResponseBody
    public String sendSMS(@RequestBody HashMap<String, String> input) {
        if(input.get("phone") == null)
            return "1";
        Random rand  = new Random();
        String numStr = "";
        for(int i=0; i<4; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr+=ran;
        }
        Message message = new Message();
        message.setFrom("01040563512");
        message.setTo(input.get("phone"));
        message.setText("Phorest 휴대폰 인증 메시지 : 인증번호는 " + "[" + numStr + "]" + "입니다");
        try {
            // send 메소드로 단일 Message 객체를 넣어도 동작합니다!
            MultipleDetailMessageSentResponse response = this.messageService.send(message);

            // 중복 수신번호를 허용하고 싶으실 경우 위 코드 대신 아래코드로 대체해 사용해보세요!
            //MultipleDetailMessageSentResponse response = this.messageService.send(messageList, true);
            System.out.println(response);
        } catch (NurigoMessageNotReceivedException exception) {
            System.out.println(exception.getFailedMessageList());
            System.out.println(exception.getMessage());
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
        return numStr;
    }
}
