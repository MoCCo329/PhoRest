package a101.phorest.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoDTO {
    String encodedPostId;
    String accessToken;
    String path;
}
