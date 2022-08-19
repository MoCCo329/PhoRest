package a101.phorest.jwt;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@Component
public class JwtProperties {
    private final String subject = "atk";
    private final int expireTime = 1000 * 60 * 30;
    private final String hashKey = "atk_secret";

    private final String token_prefix = "Bearer ";
}