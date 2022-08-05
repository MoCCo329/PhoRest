package a101.phorest.service;

import a101.phorest.domain.Follow;
import a101.phorest.domain.User;
import a101.phorest.dto.FollowDTO;
import a101.phorest.repository.FollowRepository;
import a101.phorest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Transactional
    public List<FollowDTO> getFollowingsof(String username){

        Long userId = userRepository.findByUsername(username).getUsedId();

        List<Follow> follows = followRepository.findAllByFollower(userId);
        List<FollowDTO> followDTOS = new ArrayList<>();

        for(int i=0;i<follows.size();i++){
            FollowDTO followDto = new FollowDTO(follows.get(i));
            followDTOS.add(followDto);
        }
        return followDTOS;
    }

    @Transactional
    public Long join(Long other_id, Long my_id){
        Follow follow = new Follow();
        User other_user = userRepository.findById(other_id).get();
        User my_user = userRepository.findById(my_id).get();

        follow.setFollower(my_user);
        follow.setFollowing(other_user);

        followRepository.save(follow);
        //followCount 구현하기
        return follow.getId();
    }

    @Transactional
    public Long remove(Long other_id, Long my_id) {
        Follow follow = followRepository.findByFollowerAndFollowing(other_id,my_id).get();
        followRepository.deleteById(follow.getId());
        //followCount구현하기
        return follow.getId();
    }
}
