package a101.phorest.controller;

import a101.phorest.domain.Post;
import a101.phorest.dto.PostDTO;
import a101.phorest.dto.UserDTO;
import a101.phorest.service.PostService;
import a101.phorest.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@Component
@RequiredArgsConstructor
public class MessageController {

    private final DefaultMessageService messageService;

    private final PostService postService;

    private final UserService userService;

    //https://data-make.tistory.com/699
    @Scheduled(cron = "0 9 0 * * *")
    public void sendMsg() throws Exception {
        //refresh token 받아서 accesstoken받기

        //메세지 보내기
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
                if(userDTO.isMessageSent())
                    return;
                userService.setMessageSent(userDTO.getUsername());
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
}
