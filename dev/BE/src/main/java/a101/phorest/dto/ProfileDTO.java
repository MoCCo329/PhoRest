package a101.phorest.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
@Getter @Setter
public class ProfileDTO {
    @NotNull(message = "nickname은 필수값입니다.")
    @Size(min = 3, max = 50, message = "nickname의 크기는 3자 이상 이어야 합니다.")
    private String nickname;

    //@NotNull(message = "phone은 필수값입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.]?(\\d{3}|\\d{4})[.]?(\\d{4})$", message = "제대로 된 휴대폰 번호를 입력해주세요")
    private String phone;

    private String profileURL;

    @Size(max = 255, message = "소개글의 최대 길이는 255입니다.")
    private String introduce;
}
