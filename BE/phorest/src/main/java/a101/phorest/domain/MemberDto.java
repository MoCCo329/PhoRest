package a101.phorest.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
@Getter @Setter
public class MemberDto {
    private Long id;

    private String username;

    private String nickname;

    private String password;

    private String phone;
}
