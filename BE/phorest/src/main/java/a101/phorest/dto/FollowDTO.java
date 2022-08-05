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
        this.id = follow.getId();
        this.following_user_id = follow.getFollowing().getUsedId();
    }

    private Long id;
    private Long following_user_id;
}
