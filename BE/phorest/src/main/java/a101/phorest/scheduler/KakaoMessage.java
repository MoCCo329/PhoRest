package a101.phorest.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class KakaoMessage {
    //https://data-make.tistory.com/699
    @Scheduled(cron ="0 9 0 * * *")
    public void sendMsg() throws Exception{
        //refresh token 받아서 accesstoken받기

        //메세지 보내기
    }
}
