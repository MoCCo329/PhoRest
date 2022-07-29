package a101.phorest.service;

import a101.phorest.domain.User;
import a101.phorest.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
   private final UserRepository userRepository;

   public CustomUserDetailsService(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   @Override
   @Transactional
   public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException{
//      return userRepository.findByUsername(username)
//         .map(user -> createUser(username, user))
//         .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
      User user = userRepository.findByUsername(username);
      if(user==null){
         throw new UsernameNotFoundException(username);
         }
      return (UserDetails) user;

   }

//   private org.springframework.security.core.userdetails.User createUser(String username, User user) {
//      if (!user.isActivated()) {
//         throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
//      }
//      List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
//              .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
//              .collect(Collectors.toList());
//      return new org.springframework.security.core.userdetails.User(user.getUsername(),
//              user.getPassword(),
////              grantedAuthorities);
//              user.getRole());
//   }
}
