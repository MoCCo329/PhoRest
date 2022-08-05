package a101.phorest.dto;

import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {



   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 3, max = 100)
   private String password;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @Size(min = 3, max = 100)
   private String beforePassword;

   @NotNull
   @Size(min = 3, max = 50)
   private String nickname;

   @JsonIgnore
   @Enumerated(EnumType.STRING)
   private Role role;

   @NotNull
   @Size(min = 3, max = 50)
   private String phone;

   private String profileURL;

   private String introduce;

   private List<PostDTO> postDTOS;

   private Long followers;

   private Long following;

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