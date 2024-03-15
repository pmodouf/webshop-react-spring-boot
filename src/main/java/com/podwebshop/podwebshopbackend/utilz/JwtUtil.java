package com.podwebshop.podwebshopbackend.utilz;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "mySecretKey";
    private final Algorithm algorithm = Algorithm.HMAC256(SECRET);
    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 86_400_000)) // 24h expiration
                .sign(algorithm);
    }

    public boolean verifyToken(String token) {
        log.info("Verifying token: {}", token);
        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            log.info("Token verified successfully");
            return true;
        } catch (JWTVerificationException e) {
            log.error("Token verification failed: {}", e.getMessage());
            return false;
        }
    }
}
