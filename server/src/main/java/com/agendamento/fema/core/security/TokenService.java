package com.agendamento.fema.core.security;

import com.agendamento.fema.shared.entities.Usuario;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.*;

@Service
public class TokenService   {
    @Value("${api.security.token.secret}")
    private String secret;

public String generateToken(Usuario user) {
    try{
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withIssuer("auth")
                .withSubject(user.getLogin())
                .withExpiresAt(genExpirationDate())
                .sign(algorithm);

    } catch (JWTCreationException exception) {
        throw new RuntimeException("Error while generating token", exception);
    }
}
public String validateToken(String token) {
    try {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm)
                .withIssuer("auth")
                .build()
                .verify(token)
                .getSubject();
    }catch (JWTVerificationException exception){
        return "";
    }
}
    private Instant genExpirationDate() {
        return ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"))
                .plusHours(4)
                .toInstant();
    }
}
