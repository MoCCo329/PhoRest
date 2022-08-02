package a101.phorest.jwt;

import a101.phorest.auth.PrincipalDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import a101.phorest.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Setter
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final JwtProperties jwtProperties;
    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // login 시도
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            User user = objectMapper.readValue(request.getInputStream(), User.class);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    // login 성공했을 때 처리해주는 method
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        // JWT token 만들어주기
        String jwtToken = JWT.create()
                .withSubject(jwtProperties.getSubject())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtProperties.getExpireTime()))
                .withClaim("id", principalDetails.getUser().getUsedId())
                .withClaim("account", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(jwtProperties.getHashKey()));

        response.addHeader("Authorization", jwtProperties.getToken_prefix() + jwtToken);
    }
}
