package a101.phorest.dto;

import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import antlr.Token;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {



   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 3, max = 100)
   private String password;

   @NotNull
   @Size(min = 3, max = 50)
   private String nickname;

   @Enumerated(EnumType.STRING)
   private Role role;

   @NotNull
   @Size(min = 3, max = 50)
   private String phone;

   //private String token;

//   private Set<a101.phorest.dto.AuthorityDto> authorityDtoSet;

   public static UserDto from(User user) {
      if(user == null) return null;

      UserDto userDto = UserDto.builder()
              .username(user.getUsername())
              .nickname(user.getNickname())
              .role(user.getRole())
              .phone(user.getPhone())
              .build();

      return userDto;
//
//      Token token = TokenDto.builder().
   }

}