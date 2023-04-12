/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.example.websocket.service;

import com.example.websocket.model.CustomUserDetails;
import com.example.websocket.model.User;
import com.example.websocket.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        if (userRepository.findByUsername(user.getUsername()) == null) {
            return userRepository.save(user);
        }
        return null;
    }
    public User update(User user){
        return userRepository.save(user);
    }
    public User findById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return user;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return new CustomUserDetails(user);
    }
    public List<User> getListFriend(Long userId){
        User user =userRepository.findById(userId).orElse(null);
        return user.getFriends();
    }
    public void addFriend(User user1,User user2) throws Exception{
        if(user1 !=null && user2 !=null){
            user1.getFriends().add(user2);
            user2.getFriends().add(user1);
            userRepository.save(user1);
            userRepository.save(user2);
        }
    }
    public List<User> searchUser(String keyword){
        List<User> results = userRepository.searchUserByKeyword(keyword);
        return results;
    }
}
