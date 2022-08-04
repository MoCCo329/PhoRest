package a101.phorest.service;


import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import a101.phorest.dto.LoginDto;
import a101.phorest.dto.TokenDto;
import a101.phorest.dto.UserDto;
import a101.phorest.exception.DuplicateMemberException;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        if (userRepository.findByNickname(userDto.getNickname()) != null){
            throw new DuplicateMemberException("이미 사용 중인 닉네임 입니다.");
        }
        if (userRepository.findByPhone(userDto.getPhone()) != null){
            throw new DuplicateMemberException("핸드폰 번호가 이미 있습니다.");
        }

//        Authority authority = Authority.builder()
//                .authorityName("ROLE_USER")
//                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .phone(userDto.getPhone())
                .role(Role.USER) // user로 가입
                .activated(true)
                .build();

        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public TokenDto login(LoginDto loginDto){
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

            return new TokenDto(jwt);
        }
    }

    @Transactional
    public void logout(String username){
        User user = userRepository.findByUsername(username);
        user.setActivated(false);
    }

    public Optional<UserDto> findDtoUsernameOne(String username){
        User user = userRepository.findByUsername(username);
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setNickname(user.getNickname());
        userDto.setPassword(user.getPassword());
        userDto.setPhone(user.getPhone());
        userDto.setProfileURL(user.getProfileUrl());
        return Optional.of(userDto);
    }

    @Transactional
    public Long updateUser(UserDto userDto, String username){
        User user = userRepository.findByUsername(username);
        User user1 = userRepository.findByNickname(userDto.getNickname());
        User user2 = userRepository.findByPhone(userDto.getPhone());
        if(!passwordEncoder.matches(userDto.getBeforePassword(), user.getPassword()))
            return 2L;
        if(user1 != null && !user1.getUsername().equals(user.getUsername()))
            return 3L;
        if(user2 != null && !user2.getUsername().equals(user.getUsername()))
            return 4L;
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setNickname(userDto.getNickname());
        user.setProfileUrl(userDto.getProfileURL());
        user.setPhone(userDto.getPhone());
        return 0L;

    }
//
//    @Transactional(readOnly = true)
//    public UserDto getUserWithAuthorities(String username) {
//        return UserDto.from(userRepository.findByUsername(username));
//    }

//    @Transactional(readOnly = true)
//    public UserDto getMyUserWithAuthorities() {
//        UserDto userDto = UserDto.from(SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername));
//        return  userDto;
//    }
}
