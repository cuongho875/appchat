/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.example.websocket.controller;

import com.example.websocket.model.Group;
import com.example.websocket.model.User;
import com.example.websocket.payload.response.UserResponse;
import com.example.websocket.service.GroupService;
import com.example.websocket.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;
    @GetMapping("getUser/{userId}")
    public ResponseEntity getUser(@PathVariable("userId") Long id) {
        try {
            User user = userService.findById(id);
            if (user != null) {
                return new ResponseEntity(user, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("getListFriend/{userId}")
    public ResponseEntity getListFriend(@PathVariable("userId") Long id) {
        try {
            List<User> listFriend = userService.getListFriend(id);
            return new ResponseEntity(listFriend, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }
        @GetMapping("getListGroup/{userId}")
    public ResponseEntity getListGroup(@PathVariable("userId") Long id) {
        try {
            User user = userService.findById(id);
            if(user!=null){
                List<Group> listGroup = user.getGroups();
                return new ResponseEntity(listGroup, HttpStatus.OK);
            }
            else{
                return new ResponseEntity(HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/addFriend/{userId1}/{userId2}")
    public ResponseEntity addFriend(@PathVariable("userId1") Long userId1, @PathVariable("userId2") Long userId2) {
        try {
            User user1 = userService.findById(userId1);
            User user2 = userService.findById(userId2);
            if(user1.getFriends().contains(user2)){
                return new ResponseEntity(new UserResponse("ERROR", "Đã là bạn bè"),HttpStatus.OK);
            }
            userService.addFriend(user1, user2);
            return new ResponseEntity(new UserResponse("SUCCESS", "Thêm thành công"),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity search(@PathVariable("keyword") String keyword) {
        try {
            List<User> users = userService.searchUser(keyword);
            return new ResponseEntity(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }
}
