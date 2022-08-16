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
import java.util.Comparator;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
   @NotNull(message = "ID는 필수값입니다.")
   @Pattern(regexp="^[A-Za-z]{1}[A-Za-z0-9]{4,50}$",
           message = "영문자로 시작하는 영문자와 숫자 로 이루어진 5자 이상의 ID이어야 합니다")
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   //@NotNull(message = "password는 필수값입니다.")
   @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}$",
           message = "영문자와 숫자와 특수문자(~!@#$%^&*()+|=) 로 이루어진 8자 이상의 password이어야 합니다")
   private String password;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,50}$",
           message = "영문자와 숫자와 특수문자(~!@#$%^&*()+|=) 로 이루어진 8자 이상의 beforePassword이어야 합니다")
   private String beforePassword;

   @NotNull(message = "nickname은 필수값입니다.")
   @Size(min = 3, max = 50, message = "nickname의 크기는 3자 이상 이어야 합니다.")
   private String nickname;

   @JsonIgnore
   @Enumerated(EnumType.STRING)
   private Role role;

   //@NotNull(message = "phone은 필수값입니다.")
   @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "제대로 된 휴대폰 번호를 입력해주세요")
   private String phone;

   private String profileURL;

   private String introduce;

   private List<PostDTO> postDTOS;
   private Boolean isActivated;

   private Long followerCount;

   private Long followingCount;

   private boolean isFollowing;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private String refresh_token;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private String access_token;

   private boolean isKakao;

   //private String token;

//   private Set<a101.phorest.dto.AuthorityDto> authorityDtoSet;

   public UserDTO(User user){
      this.username = user.getUsername();
      this.nickname = user.getNickname();
      this.profileURL = user.getProfileURL();
      this.introduce = user.getIntroduce();
   }

   public static UserDTO from(User user) {
      if(user == null) return null;

      UserDTO userDto = UserDTO.builder()
              .username(user.getUsername())
              .nickname(user.getNickname())
              .role(user.getRole())
              .phone(user.getPhone())
              .profileURL(user.getProfileURL())
              .access_token(user.getAccess_token())
              .refresh_token(user.getRefresh_token())
              .introduce(user.getIntroduce())
              .isActivated(true)
              .isKakao(user.isKakao())
              .build();

      return userDto;
//
//      Token token = TokenDto.builder().
   }

}