package a101.phorest.dto;

import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {



   @NotNull(message = "username은 필수값입니다.")
   @Pattern(regexp="^(?=.*[0-9])(?=.*[a-z]).{3,50}$",
           message = "username은 영문자와 숫자 로 이루어진 5자 이상의 username이어야 합니다")
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull(message = "password는 필수값입니다.")
   @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()]{8,50}$",
           message = "password은 영문자와 숫자와 특수문자 로 이루어진 8자 이상의 password이어야 합니다")
   private String password;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}$",
           message = "beforePassword은 영문자와 숫자와 특수문자 로 이루어진 8자 이상의 beforePassword이어야 합니다")
   private String beforePassword;

   @NotNull(message = "nickname은 필수값입니다.")
   @Size(min = 3, max = 50, message = "nickname의 크기는 3자 이상 이어야 합니다.")
   private String nickname;

   @JsonIgnore
   @Enumerated(EnumType.STRING)
   private Role role;

   @NotNull(message = "phone은 필수값입니다.")
   @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "phone에는 10 ~ 11 자리의 숫자만 입력 가능합니다.")
   private String phone;

   private String profileURL;

   private String introduce;

   private List<PostDTO> postDTOS;

   private Long followerCount;

   private Long followingCount;

   private boolean isFollowing;

   //private String token;

//   private Set<a101.phorest.dto.AuthorityDto> authorityDtoSet;

   public static UserDTO from(User user) {
      if(user == null) return null;

      UserDTO userDto = UserDTO.builder()
              .username(user.getUsername())
              .nickname(user.getNickname())
              .role(user.getRole())
              .phone(user.getPhone())
              .profileURL(user.getProfileUrl())
              .introduce(user.getIntroduce())
              .build();

      return userDto;
//
//      Token token = TokenDto.builder().
   }

}