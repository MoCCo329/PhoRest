package a101.phorest.service;


import a101.phorest.domain.*;
import a101.phorest.dto.*;
import a101.phorest.exception.DuplicateMemberException;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.validation.constraints.Null;
import java.util.*;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class UserService {

    @Value("${kakao.password}") String secret;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final MyPageRepository myPageRepository;
    private final LikeRepository likeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final FollowRepository followRepository;
    private final CommentRepository commentRepository;

    private final EntityManager em;

    @Transactional
    public Long removeUser(String password, String username){
        User user = userRepository.findByUsername(username);
        User admin = userRepository.findByUsername("unkn0wnuser");

        if( !user.isKakao() && !passwordEncoder.matches(password, user.getPassword()))
            return 2L;

        List<Comment> comments = user.getComments();
        List<MyPage> mypages = myPageRepository.findAllByUserId(user.getUserId());
        //        1. 프레임이랑 코멘트 빼고 다 삭제하기
        for(int i=0;i<comments.size();i++){
            comments.get(i).setUser(admin);
            commentRepository.save(comments.get(i));
            em.flush();
        }
        // mypage에 frame 옮기기
        for(int i=0;i<mypages.size();i++){
            if(mypages.get(i).getCategory().equals("frame")){
                mypages.get(i).setUser(admin);
                myPageRepository.save(mypages.get(i));
                em.flush();
            }
        }

        likeRepository.deleteAllByUserId(user.getUserId());
        bookmarkRepository.deleteAllByUserId(user.getUserId());

        followRepository.deleteAllByFollowerUserId(user.getUserId());
        followRepository.deleteAllByFollowingUserId(user.getUserId());

        // 2. 삭제되는 회원의 post에 소유권 없애기(mypage에 photogroup 삭제), like 취소, bookmark 취소, following follow 취소, isactive false 로 만들기

        for(int i=0;i<mypages.size();i++){
            if(mypages.get(i).getCategory().equals( "photogroup")){
                likeRepository.deleteAllByPostId(mypages.get(i).getPost().getId());
                bookmarkRepository.deleteAllByPostId(mypages.get(i).getPost().getId());
                myPageRepository.deleteById(mypages.get(i).getId());
            }
        }

        List<Like> likes = likeRepository.findAllByUserId(user.getUserId());
        for(int i=0;i<likes.size();i++){
            likeRepository.deleteById(likes.get(i).getId());
        }

        userRepository.deleteById(user.getUserId());
        return 0L;
    }

    @Transactional
    public List<UserDTO> findAllByNickname(String nickname){
        List<User> users = userRepository.findAllByNickname(nickname);
        List<UserDTO> userDTOS = new ArrayList<>();

        for(int i=0;i<users.size();i++){
            UserDTO userDTO = new UserDTO(users.get(i));
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }

    @Transactional
    public UserDTO signup(UserDTO userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        if (userRepository.findByPhone(userDto.getPhone()) != null){
            throw new DuplicateMemberException("핸드폰 번호가 이미 있습니다.");
        }
/*        if (userDto.getPhone().length() != 11){
            throw new DuplicateMemberException("핸드폰 번호가 잘못되었습니다.");
        }*/

//        Authority authority = Authority.builder()
//                .authorityName("ROLE_USER")
//                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .phone(userDto.getPhone())
                .isKakao(false)
                .role(Role.USER) // user로 가입
                .activated(true)
                .isMessageSent(false)
                .build();

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional
    public TokenDTO login(LoginDTO loginDto){
        String username = loginDto.getUsername();
        String password= loginDto.getPassword();
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new DuplicateMemberException("아이디가 없습니다.");
        else if(!passwordEncoder.matches(password,user.getPassword())){
            throw new DuplicateMemberException("비밀번호가 틀렸습니다.");
        }
        else{
            user.setActivated(true);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, password);

            String jwt = tokenProvider.createToken(authenticationToken);

            return new TokenDTO(jwt);
        }
    }

    @Transactional
    public void logout(String username){
        User user = userRepository.findByUsername(username);
        user.setActivated(false);
    }

    public Optional<UserDTO> findDtoUsernameOne(String username){
        User user = userRepository.findByUsername(username);
        UserDTO userDto = new UserDTO();
        userDto.setUsername(user.getUsername());
        userDto.setNickname(user.getNickname());
        userDto.setPassword(user.getPassword());
        userDto.setPhone(user.getPhone());
        userDto.setProfileURL(user.getProfileURL());
        userDto.setIntroduce(user.getIntroduce());
        userDto.setKakao(user.isKakao());
        return Optional.of(userDto);
    }

    @Transactional
    public Long updateUserProfile(ProfileDTO profileDTO, String username){
        User user = userRepository.findByUsername(username);

        if(profileDTO.getPhone() != null){
            User user2 = userRepository.findByPhone(profileDTO.getPhone());
            if(user2 != null && !user2.getUsername().equals(user.getUsername()))
                return 2L;
        }
        user.setNickname(profileDTO.getNickname());
        user.setProfileURL(profileDTO.getProfileURL());
        user.setPhone(profileDTO.getPhone());
        user.setIntroduce(profileDTO.getIntroduce());
        return 0L;

    }
    @Transactional
    public Long updatePassword(PasswordDTO passwordDTO, String username){
        User user = userRepository.findByUsername(username);
        if(!passwordEncoder.matches(passwordDTO.getBeforePassword(), user.getPassword()))
            return 2L;
        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));
        return 0L;
    }

    @Transactional
    public TokenDTO setKakaoUser(HashMap<String, String> userInfo, List<String> tokens){
        /** 회원 정보 카톡으로 받기 */

        UserDTO ud = new UserDTO();

        String username = userInfo.get("id") +"@k";

        if (userRepository.findByUsername(username) != null){
            //이미 있는 회원

            userRepository.findByUsername(username).setActivated(true);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, userRepository.findByUsername(username).getPassword());

            String jwt = tokenProvider.createToken(authenticationToken);

            return new TokenDTO(jwt);
        }

        ud.setUsername(username);
        ud.setAccess_token(tokens.get(0));
        ud.setRefresh_token(tokens.get(1));
        ud.setNickname(userInfo.get("nickname"));
        ud.setProfileURL(userInfo.get("profile_image"));
        ud.setIsActivated(true);
        ud.setKakao(true);
//        if(userInfo.get("phone_number") != null){
//            ud.setPhone(userInfo.get("phone_number"));
//            //국내 번호인 경우 +82 00-0000-0000 또는 +82 00 0000 0000 형식
//        }

        String pw = username + secret;

        User user = User.builder()
                .username(ud.getUsername())
                .password(passwordEncoder.encode(pw.toString()))
                .nickname(ud.getNickname())
                .phone(ud.getPhone())
                .access_token(ud.getAccess_token())
                .refresh_token(ud.getRefresh_token())
                .profileURL(ud.getProfileURL())
                .role(Role.USER) // user로 가입
                .activated(true)
                .isKakao(true)
                .build();

        userRepository.save(user);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, user.getPassword());

        String jwt = tokenProvider.createToken(authenticationToken);

        return new TokenDTO(jwt);
    }


    @Transactional
    public void setMessageSent(String username){
        User user = userRepository.findByUsername(username);
        user.setMessageSent(true);
    }


}
