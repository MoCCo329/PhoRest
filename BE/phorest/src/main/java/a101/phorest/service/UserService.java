package a101.phorest.service;

//import java.util.Collections;

import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import a101.phorest.dto.LoginDto;
import a101.phorest.dto.TokenDto;
import a101.phorest.dto.UserDto;
import a101.phorest.exception.DuplicateMemberException;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.UserRepository;
//import a101.phorest.util.SecurityUtil;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       TokenProvider tokenProvider,
                       AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

//        Authority authority = Authority.builder()
//                .authorityName("ROLE_USER")
//                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
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
            throw new DuplicateMemberException("비밀전호가 틀렸습니다.");
        }
        else{
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, password);

            //여기서 오류가 나요. authentication이 null이 될 수도 있대요. 그런데 그럴 순 없 어요
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);



            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.createToken(authentication);

//            HttpHeaders httpHeaders = new HttpHeaders();
//            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

           // return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);

            return new TokenDto(jwt);
        }
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
