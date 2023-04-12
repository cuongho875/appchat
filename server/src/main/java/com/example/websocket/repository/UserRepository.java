/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.example.websocket.repository;

import com.example.websocket.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
/**
 *
 * @author Admin
 */
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
    @Query(
    value = "SELECT * FROM `users` WHERE CONCAT(first_name,' ',last_name) LIKE %?1%",
            nativeQuery = true)
    public List<User> searchUserByKeyword(String keyword);
}
