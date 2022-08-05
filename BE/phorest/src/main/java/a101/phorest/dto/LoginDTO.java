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
    @Pattern(regexp="(?=.*[0-9])(?=.*[a-z]).{3,50}",
            message = "username은 영문자와 숫자 로 이루어진 5자 이상의 username이어야 합니다")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Pattern(regexp="(?=.*[0-9])(?=.*[a-z]).{8,50}",
            message = "password은 영문자와 숫자 로 이루어진 8자 이상의 password이어야 합니다")
    private String password;
}
