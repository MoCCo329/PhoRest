package a101.phorest.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    @NotNull
    @Pattern(regexp="[A-Za-z]{1}[A-Za-z0-9]{4,50}",
            message = "영문자로 시작하는 영문자와 숫자 로 이루어진 5자 이상의 ID이어야 합니다")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Pattern(regexp="(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}",
            message = "영문자와 숫자와 특수문자(~!@#$%^&*()+|=) 로 이루어진 8자 이상의 password이어야 합니다")
    private String password;
}
