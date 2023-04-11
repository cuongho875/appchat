/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.example.websocket.repository;

import com.example.websocket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 *
 * @author Admin
 */
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
}
