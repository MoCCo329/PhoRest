package a101.phorest.jwt;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@Component
public class JwtProperties {
    private final String SUBJECT = "atk";
    private final int EXPIRE_TIME = 1000 * 60 * 30;
    private final String HASH_KEY = "atk_secret";

    private final String TOKEN_PREFIX = "Bearer ";
}