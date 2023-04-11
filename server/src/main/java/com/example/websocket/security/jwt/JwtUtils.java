/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.websocket.security.jwt;

import com.example.websocket.model.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 *
 * @author Admin
 */
@Component
@Slf4j
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private String jwtAccessSecret = "lodaaaaaa";
    private long jwtExpirationMs = 604800000L;

    // Tạo chuỗi json web token từ id của user.
    public String generateAccessToken(CustomUserDetails userDetails) {
        Date now = new Date();
        Date expriDate = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getUser().getUserId()))
                .setIssuedAt(now)
                .setExpiration(expriDate)
                .signWith(SignatureAlgorithm.HS512, jwtAccessSecret)
                .compact();
    }
    // Lấy thông tin user từ jwt

    public Long getUserIdFromAccessToken(String token) {
        return Long.parseLong(
                Jwts.parser()
                        .setSigningKey(jwtAccessSecret)
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject());
    }
    public boolean validateAccessToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtAccessSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
