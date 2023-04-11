/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.example.websocket.controller;

import com.example.websocket.model.CustomUserDetails;
import com.example.websocket.model.User;
import com.example.websocket.payload.request.SignInRequest;
import com.example.websocket.payload.request.SignUpRequest;
import com.example.websocket.payload.response.JwtTokenResponse;
import com.example.websocket.payload.response.RandomStuff;
import com.example.websocket.payload.response.SignUpResponse;
import com.example.websocket.security.jwt.JwtUtils;
import com.example.websocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class.getName());
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity signUp(@RequestBody SignInRequest userRequest, HttpServletResponse response) {
        try {
            User user = userService.findByUsername(userRequest.getUsername());
            if (user != null) {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(userRequest.getUsername(),
                                userRequest.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                //genarate accessToken 
                String jwt = jwtUtils.generateAccessToken((CustomUserDetails) authentication.getPrincipal());
                //add cookie userId
                Cookie cookie = new Cookie("userId", String.valueOf(user.getUserId()));
                cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
                cookie.setSecure(true);
                cookie.setHttpOnly(false);
                cookie.setPath("/");
                response.addCookie(cookie);
                //add cookie accessToken
                Cookie cookie1 = new Cookie("accessToken", jwt);

                cookie1.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
                cookie1.setSecure(true);
                cookie1.setHttpOnly(false);
                cookie1.setPath("/");
                response.addCookie(cookie1);
                return new ResponseEntity(new JwtTokenResponse(jwt), HttpStatus.OK);
            } else {
                return new ResponseEntity(new RandomStuff("Username not exist"), HttpStatus.BAD_REQUEST);

            }

        } catch (AuthenticationException e) {
            return new ResponseEntity(new RandomStuff("Wrong password"), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody SignUpRequest userRequest) {
        try {
            User user = userService.findByUsername(userRequest.getUsername());
            if (user != null) {
                return new ResponseEntity(new RandomStuff("Username exist"), HttpStatus.CONFLICT);
            }
            user = new User();
            user.setUsername(userRequest.getUsername());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setFirstName(userRequest.getFirstName());
            user.setLastName(userRequest.getLastName());
            user.setAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU");
            userService.save(user);
            return new ResponseEntity(new SignUpResponse(user, "Success"), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new RandomStuff(e.getMessage()), HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity Logout(HttpServletRequest request, HttpServletResponse response) {

        Cookie deleteCookieUserId = new Cookie("userId", null);
        deleteCookieUserId.setMaxAge(0);
        deleteCookieUserId.setSecure(true);
        deleteCookieUserId.setHttpOnly(false);
        deleteCookieUserId.setPath("/");
        response.addCookie(deleteCookieUserId);
        Cookie deleteCookieAccessToken = new Cookie("accessToken", null);
        deleteCookieAccessToken.setMaxAge(0);
        deleteCookieAccessToken.setSecure(true);
        deleteCookieAccessToken.setHttpOnly(false);
        deleteCookieAccessToken.setPath("/");
        response.addCookie(deleteCookieAccessToken);
        return ResponseEntity.ok("logout");
    }

    @GetMapping("test")
    public ResponseEntity test() {
        User user = userService.findByUsername("test123");
//        User user1 = userService.findByUsername("test2");
//        Group group = new Group();
//        group.getUsers().add(user);
//        groupRepository.save(group);
//        Group group = groupRepository.findById(Integer.toUnsignedLong(1)).get();
//        List<Group> groups = groupRepository.findGroupsByUserId(user.getUserId());
//        groupRepository.save(group);
//        userService.update(user);
//        userService.update(user1);
        return ResponseEntity.ok(user);
    }
}
