/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.example.websocket.controller;

import com.example.websocket.model.Group;
import com.example.websocket.model.User;
import com.example.websocket.service.GroupService;
import com.example.websocket.service.UserService;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api/group/")
public class GroupController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;

    @PostMapping("/createGroup")
    public ResponseEntity createGroup(@RequestParam String nameGroup, @RequestParam List<Long> userIds) throws Exception {
        List<User> listUsers = new ArrayList<>();
        for (Long id : userIds) {
            User user = userService.findById(id);
            if (user != null) {
                listUsers.add(user);
            } else {
                return new ResponseEntity("Error", HttpStatus.CONFLICT);
            }
        }
        Group group = groupService.createGroup(nameGroup, listUsers);
        if (group != null) {
            return new ResponseEntity(group, HttpStatus.CREATED);
        }
        return new ResponseEntity("Error", HttpStatus.CONFLICT);
    }

    @PostMapping("/addUserToGroup")
    public ResponseEntity addUserToGroup(@RequestParam Long groupId, @RequestParam Long userId) throws Exception {
            User user = userService.findById(userId);
            if (user != null) {
                Group group = groupService.addUserGroup(groupId,user);
                if (group != null) {
                    return new ResponseEntity(group, HttpStatus.CREATED);
                }
                else {
                return new ResponseEntity("Error", HttpStatus.CONFLICT);
            }
            } 
        return new ResponseEntity("Error", HttpStatus.CONFLICT);       
    }
    @PostMapping("/removeUserToGroup")
    public ResponseEntity removeUserToGroup(@RequestParam Long groupId, @RequestParam Long userId) throws Exception {
            User user = userService.findById(userId);
            if (user != null) {
                Group group = groupService.removeUserGroup(groupId,user);
                if (group != null) {
                    return new ResponseEntity(group, HttpStatus.CREATED);
                }
                else {
                return new ResponseEntity("Error", HttpStatus.CONFLICT);
            }
            } 
        return new ResponseEntity("Error", HttpStatus.CONFLICT);       
    }
}
