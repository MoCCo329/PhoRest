package a101.phorest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter @Setter
public class PasswordDTO {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "password는 필수값입니다.")
    @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}$",
            message = "password은 영문자와 숫자와 특수문자(~!@#$%^&*()+|=) 로 이루어진 8자 이상의 password이어야 합니다")
    private String password;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "beforepassword는 필수값입니다.")
    @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}$",
            message = "beforePassword은 영문자와 숫자와 특수문자(~!@#$%^&*()+|=) 로 이루어진 8자 이상의 beforePassword이어야 합니다")
    private String beforePassword;
}
