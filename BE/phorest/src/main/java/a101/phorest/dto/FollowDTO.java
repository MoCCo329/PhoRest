package a101.phorest.dto;

import a101.phorest.domain.Follow;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FollowDTO {

    public FollowDTO(Follow follow){
        this.username = follow.getFollowing().getUsername();
    }
    private String username;
}
