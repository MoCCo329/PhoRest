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

    public FollowDTO(Follow follow, String category){
        if(category.equals("following")){
            this.username = follow.getFollowing().getUsername();
            this.nickname = follow.getFollowing().getNickname();
            this.profileURL = follow.getFollowing().getProfileURL();
        }
        else if(category.equals("follower")){
            this.username = follow.getFollower().getUsername();
            this.nickname = follow.getFollower().getNickname();
            this.profileURL = follow.getFollower().getProfileURL();
        }

    }
    private String username;
    private String nickname;
    private String profileURL;
}
