package a101.phorest.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class KakaoDTO {

    private String refresh_token;
    private String access_token;

    public KakaoDTO() {

    }
}
